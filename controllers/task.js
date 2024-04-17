import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask=async (req,res,next)=>{
    try {
        console.log("asdj");
        const {title,description}=req.body;

        const task=await Task.create({
            title,description,
            user:req.user
        });
        res.status(201).json( {
            success:true,
            message:"Task added"
        })
    } catch (error) {
        next(error)
    }
}

export const getMyTasks=async(req,res,next)=>{

    try{
        const userid=req.user._id;
        const tasks=await Task.find({user:userid});

        res.status(200).json({
            success:true,
            tasks,
        })
    }
    catch(err){
        next(err);
    }
}

export const updateTask=async(req,res,next)=>{

    try {
        const id=req.params.id;

        const task=await Task.findById(id);

        if(!task) return next(new ErrorHandler("Task Not Found",404));

        task.isCompeted=!task.isCompeted

        await task.save();

        res.status(200).json({
            success:true,
            message:"task updated"
        })
    } catch (error) {
        next(error)
    }
    
}

export const deleteTask=async(req,res,next)=>{

    try {
        const id=req.params.id;

        const task=await Task.findById(id);

        if(!task) return next(new ErrorHandler("Task Not Found",404));

        await task.deleteOne();
        console.log("..........");
        res.status(200).json({
            success:true,
            message:"task deleted",
            
        })
    } catch (error) {
        next(error)
    }

}