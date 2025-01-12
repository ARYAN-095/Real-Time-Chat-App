
import mongoose from "mongoose";

const messageSchema = new  mongoose.Schema(
    {

        // in application  meaagae sender and message receiver  both are user so we make referecne of both is "user" 

        // text message is in the form of string but they are not requires(mandatory) becaseuse some message can be only string while some message can be only image
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            requires: true,
        },

        receiverId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },


        text:{
            type:String,
        },
        image: {
            type:String,
        },
    },
        {timestamps:true} // "created at" for the message

);

const Message = mongoose.model("Message",messageSchema);

export default Message;