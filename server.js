import { app } from "./app.js";
import { connectDB } from "./data/database.js";

//this is the main file 
connectDB();
// console.log(process.env.PORT  )

app.listen(4000,()=>{
    console.log(`server is working on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})