import jwt from "jsonwebtoken";

export const setCookie= (user,res,message,statusCode=200)=>{
    const token=jwt.sign({_id:user._id},process.env.JWT_SECREAT);

    res.status(statusCode).cookie("token",token,{
        httpOnly:true,
        maxAge:15*60*1000,
        secure:process.env.NODE_ENV==="Development"?false:true,
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
    }).json({
        success:true,
        message:message
    })
}