
import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res)=>{

    const {fullName,email,password}= req.body; 

    try{
        // signup the user
        // hash the paswd
        // create token to let them know they are authencitaed

        // use bcrypt package - for paswd hashing


        if(!fullName || !email || !password){
            return res.status(400).json({message:"All field are requires"});
        }
         if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
         }

const user = await User.findOne({email});

if(user){
    return res.status(400).json({message:"Email already exists"});
} 
    
    



const salt=  await bcrypt.genSalt(10);
const hashedPassword=  await  bcrypt.hash(password,salt);


const newUser= new User({
    fullName,
    email,
    password:hashedPassword
});

// generate jwt token
if(newUser){
    generateToken(newUser._id,res);
     await  newUser.save();
    res.status(201).json({
        _id:newUser._id, 
        fullName: newUser.fullName,
        email:newUser.email,
        profilePic: newUser.profilePic,
    });
}else{
    res.status(400).json({message:"invalid user data"});
}

    } catch(error){
        
        console.log("Error in signup controller", error.message);
        res.status(500).json({message: "Internal Server Error"});

    }
    
};



export const login = async (req, res)=>{
  
    const {email, password}= req.body;

    try {
     
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid credientails"});
        }

        // if email is existed now check password is correct or not

        const isPasswordCorrect=await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid crediatials"});
        }
      
        // if password is correct now generate jwt token;

        generateToken(user._id, res);

        res.status(200).json({
            _id:user._id,
            fullName: user.fullName,
            email:user.email,
            profilePic:user.profilePic,

        })
          
    }
    catch (error){
       console.log("Error in login controller", error.message);

       res.status(500).json({message:"Internal Server Error"});
    }
};

export const logout= (req,res)=>{
     
    try{
        
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out succcessfully"});

    }
    catch(error){

        console.log("Error in logout controller", error.message);
        res.status(500).json({message:"internal server Error"});
    }

}

export const updateProfile = async(req,res)=>{
      try{
        const {profilePic} = req.body;
      const userid=  req.user._id

      if(!profilePic){
        return res.status(400).json({message:"profile pic is requires"});
      }

      // cloudinary is not a databasae is just a bucket for our database

    const uploadResoponse=  await cloudinary.uploader.upload(profilePic);
   const updatedUser= await User.findByIdAndUpdate(userid, {profilePic:uploadResoponse.secure_url}, {new:true});

   res.status(200).json(updatedUser);

   

      }catch(error){
            console.log("error in upadate profile:",error);
            res.status(500).json({message:"intenal server error"});
      }
}




export const checkAuth =(req,res)=>{
     try{
        res.status(200).json(req.user);
     }catch(error){
        console.log("error in chechAuth controller", error.message);
        res.status(500).json({message:"Internal server error"});
     }
}