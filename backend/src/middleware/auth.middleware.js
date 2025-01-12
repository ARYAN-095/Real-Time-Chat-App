

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const protectRoute= async(req,res, next)=>{

    try{
        
        // is there a token is present or not

        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({ message:"You are not logged in"});
    }


        const decoded= jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
          return res.status(401).json({message:"unauthorised - Invalid user"});  
        }

        const user = await user.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({message:"user not found"});
        }

      
        // after all the above step we finally got or user in the database
        req.user=user;

        next();

    }  
    catch(error){
       console.log("error in protectRoute middleware: ", error.message); 
    }
}