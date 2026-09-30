const statuscode = require("../../utils/statuscode");
const User = require("../../models/auth.model");
const SendEmailOtp = require("../../utils/SendEmailOtp");
const AuthService = require("../../service/authservice");
const Otp = require("../../models/otp.model");
const { genarateRefreshToken, genarateAccessToken } = require('../../utils/api');
const jwt = require('jsonwebtoken')

class AuthControllers {
  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "place provide name ,email and password field",
        });
      }

      const userdata = await AuthService.RegisterService({
        name,
        email,
        password,
      });

      await SendEmailOtp(req, userdata);

      return res.status(statuscode.OK).json({
        status: true,
        message:
          "user created succesfully . send verification otp in your email",
        data: userdata,
      });
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async verify(req, res) {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "Place provide valid email and otp",
        });
      }

      const existinguser = await User.findOne({
        where: {
          email,
        },
      });

      if (!existinguser) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "user is not found",
        });
      }

      if (existinguser.isVerified) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "user is verified already",
        });
      }

      const emaiValification = await Otp.findOne({
        where: {
          userId: existinguser.id,
          otp,
        },
      });
      if (!emaiValification) {
        if (!existinguser.isVerified) {
          await SendEmailOtp(req, existinguser);
          return res.status(statuscode.NOT_FOUND).json({
            status: false,
            message: "Invalid OTP ,new otp sent to your email",
          });
        }
      }

      const currentTime = Date.now();
      const expiriesTime =new Date(emaiValification.createdAt).getTime() + 15 * 60 * 1000;
      if (currentTime > expiriesTime) {
        await SendEmailOtp(req, existinguser);
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "Invalid OTP ,new otp sent to your email",
        });
      }

      existinguser.isVerified = true;
      await existinguser.save();
      await Otp.destroy({
      where: {
        userId: existinguser.id,
      },
    });
      return res
        .status(200)
        .json({ status: true, message: "Email verified successfully" });
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async login (req,res,next){
        try {
            const {email,password}= req.body;
            const result = await AuthService.LoginService({
                email,
                password
            })

            res.cookie("refreshToken",result.refreshToken,{
                httpOnly:true,
                secure:process.env.NODE_ENV==="production",
                sameSite:"strict",
                maxAge:7*24*60*60*1000
            })

            return res.status(statuscode.OK).json({
                status:true,
                message:"login Succesfully",
                refreshToken:result.refreshToken,
                accessToken:result.acessToken,
                user:{
                    _id:result.user.id,
                    name:result.user.name,
                    email:result.user.email,
                    role:result.user.role
                }
            })
            
        } catch (error) {
            next(error)
        }
    }

    async refreshToken(req,res,next){
        try {
            const token= req.cookies.refreshToken;
            if(!token){
                return res.status(statuscode.NOT_FOUND).json({
                    status:false,
                    message:"Invalid token"
                })
            }

            const decoded = jwt.verify(token,process.env.JWT_REFRESH_SECRET);
            const user = await User.findByPk(decoded.id);
            if(!user){
                return res.status(statuscode.NOT_FOUND).json({
                    status:false,
                    message:"User not defined"
                })
            }

            const newRefreshToken = genarateRefreshToken(user)
            const newAccessToken = genarateAccessToken(user)

            user.refreshToken=newRefreshToken

            await user.save();

            res.cookie("refreshToken",newRefreshToken,{
                httpOnly:true,
                secure:process.env.NODE_ENV==="production",
                sameSite:"strict",
                maxAge:7*24*60*60*1000
            })

            res.json({
                status:true,
                acessToken:newAccessToken
            })
            
        } catch (error) {
            next(error)
        }
    }

        async profile(req,res,next){
        try {
            return res.status(statuscode.OK).json({
                status:true,
                message:"This is user profile",
                user:req.user
            })
            
        } catch (error) {
            next(error)
        }
    }

  
}

module.exports = new AuthControllers();
