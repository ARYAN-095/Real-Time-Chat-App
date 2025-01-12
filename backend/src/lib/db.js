
import mongoose from "mongoose";


// create a fxn connect db which is async consist of try catch block
export const connectDB= async()=>{
 
 try{

// make it await beacause it takes some time
const conn=await mongoose.connect(process.env.MONGODB_URI);
     
console.log(`MongoDb connected: ${conn.connection.host}`);

 } catch (error){
       console.log("mongodb connection error:", error);
 }
    
} 