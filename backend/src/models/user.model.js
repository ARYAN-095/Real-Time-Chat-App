
import mongoose  from "mongoose";

// create schema for user
const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },

        fullName:{
            type:String,
            required:true,
        },
        password:{
             type:String,
             required: true,
             minLength:6,
        },
        profilePic: {
            type:String,
            default: "",
        },
    },

    // created at, updated at-
    // feature from when time time the user is joined
    {timestamps: true}
);


// create model for user
const User= mongoose.model("User",userSchema);
                          // first letter should be capital 
                          // you cannot put "users" bacause mongo want you to put it as a singular with first letter capital
                          // if you create something link messages you have to write "Message" it will autommaticcaly go into the messages in the database;
export default User;