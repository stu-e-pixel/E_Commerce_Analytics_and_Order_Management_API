const transport = require('../config/email.config');
const Otp = require('../models/otp.model')

const SendEmailOtp = async(req,user)=>{
    const otp = Math.floor(100000+Math.random()*900000);
    const otpdata =await new Otp({userId:user.id,otp:otp}).save();

    await transport.sendMail({
        from:process.env.EMAIL_FROM,
        to:user.email,
        subject:"OTP - Verify your account",
        text:"",
        html:`<p>Dear ${user.name},</p><p>Thank you for signing up with our website. To complete your registration, please verify your email address by entering the following one-time password (OTP)</p>
    <h2 style="text-align: center; background-color: #a61616ff; padding: 10px;">OTP: ${otp}</h2>
    <p>This OTP is valid for 15 minutes. If you didn't request this OTP, please ignore this email.</p>`
    })
    
}

module.exports = SendEmailOtp