 
 // in package json we change  type: "module" to use import statement 
import express from "express";
  import dotenv from "dotenv"; 
  import cookieParser from "cookie-parser";
  import bodyParser from 'body-parser';

  import { protectRoute } from "./middleware/auth.middleware.js";
  // to read env file
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import MessageRoutes from "./routes/message.route.js"
dotenv.config();  // must call function



const app= express();


// syntax to read env file
const PORT =process.env.PORT; 

app.use(bodyParser.json()); // to extract the json data

app.use(cookieParser());

// creating middleware for authroisation
app.use("/api/auth", authRoutes);
app.use("/api/message", MessageRoutes);





       

app.listen(PORT, ()=>{
    console.log(
        `Server is running on port ${PORT}`
    );

    connectDB();
}) 