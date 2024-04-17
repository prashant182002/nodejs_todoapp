import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import { setCookie } from "../utils/features.js";


export const register=async(req,res,next)=>{
    try {
        console.log(".......");
        const {name,email,password}=req.body;

        let user =await User.findOne({email});

        console.log(email);
        
        if(user) return next(new ErrorHandler("User already exists",400));

        const hashedPassword=await bcrypt.hash(password,10);
        
        user=await User.create({name,email,password:hashedPassword});

        setCookie(user,res,"Registered",201);
    } catch (error) {
        next(error);
    }
};

export const login=async(req,res,next)=>{
    try {
        const {email,password}=req.body;

    const user=await User.findOne({email}).select("+password");

    if(!user) return next(new ErrorHandler("Invallid email or password",400));


    console.log(email);

    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch) return next(new ErrorHandler("Invallid email or password",400));


    setCookie(user,res,`Welcome back, ${user.name}`,201)
    } catch (error) {
        next(error)
    }
};

export const logout=(req,res)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        secure:process.env.NODE_ENV==="Development"?false:true,
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
    }).json({
        success:true,
        user:req.user,
    })
}

export const getMyProfile=(req,res)=>{
    // const id="my id";

    res.status(200).json({
        success:true,
        user:req.user,
    })
};