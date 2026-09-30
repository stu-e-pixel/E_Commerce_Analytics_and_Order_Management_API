const User = require('../models/auth.model');
const { genarateAccessToken,genarateRefreshToken } = require('../utils/api');
const RegisterService = async({name,email,password})=>{

    const ExistingUser= await User.findOne({
        where:{
            email
        }
    });
    if(ExistingUser){
        throw new Error("Email already exist")
    }

    const user = await User.create({
        name,email,password,isActive:true,role:"customer",isVerified:false
    });

    return user
}


const LoginService = async({email,password})=>{
    const user = await User.findOne({
        where:{
            email
        }
    })

    console.log("USER:", user);
    console.log("REQUEST PASSWORD:", password);
    console.log("DB PASSWORD:", user?.password);

    if(!user){
        throw new Error("Invalid Email")
    }

    const isPassword = await user.comparePassword(password)

    if(!isPassword){
        throw new Error("Invalid Password")
    }
    if(!user.isActive){
        throw new Error("inactive user")
    }

    const acessToken = genarateAccessToken(user);
    const refreshToken = genarateRefreshToken(user)

    user.refreshToken = refreshToken

    await user.save();

    return {
        user,
        acessToken,
        refreshToken
    }
}

module.exports={RegisterService,LoginService}