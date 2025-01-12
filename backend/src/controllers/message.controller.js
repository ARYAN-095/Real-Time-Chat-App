import User from "../models/user.model.js";
import Message from "../models/message.model.js";




export const getUserForSidebar = async (req,res)=>{
         try{
          const loggedInUserId= req.user._id;
          const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password");
          res.status(200).json(filteredUsers);
         }catch(error){
             res.status(500).json({message: "internal server error"});
         }
};


export const getMessages = async (req,res)=>{
    try{
        const {id: userToChatId} = req.params
        const myId = req.user._id;

                            // find the message in which i am the sender or reciver is the sender
        const messages= await Message.find ({
            $or:[
                {senderId: myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })
        res.status(200).json(messages);
    }catch(error){
         
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({error:"Internal server error"});
      
    }
}

export const sendMessage = async (req, res)=>{
    try{
       const{text, image}= req.body;
       const{id:receiverId}= req.params;
       const senderId = req.user._id;

        // check user is passing image or not
        let imageUrl;

        if(image){
            const uploadResoponse= await cloudinary.uploader.upload(image);
            // now take the secure_url and assign to the imageUrl
            imageUrl= uploadResoponse.secure_url;
        }
 
        // create a new message

        const newMessage= new Message({
             senderId,
             receiverId,
             text,
             image:imageUrl,
        })

        // save the message to the database
        await newMessage.save();


        // todo: realtime functionlity => socket.io

        res.status(201).json(newMessage);


    } catch(error){
        console.log("Error in sendMessage controller: ", error.Message);
    }
};