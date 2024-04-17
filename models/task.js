import Mongoose from "mongoose"

const schema=new Mongoose.Schema({
    title:{
        type:String,
        required:true
    } ,
    description:{
        type:String,
        required:true
    } ,
    isCompeted:{
        type:Boolean,
        defaullt:false
    },
    user:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export const Task=Mongoose.model("Task",schema)