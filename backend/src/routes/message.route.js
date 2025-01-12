import express from "express";
 
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUserForSidebar,getMessages, sendMessage } from "../controllers/message.controller.js";

const router= express();


// to see the user on the sidebar
router.get("/users",protectRoute, getUserForSidebar);

// we are putting some dynamic value ':id'
router.get("/:id", protectRoute, getMessages);


// send the message
router.post("/send/:id", protectRoute, sendMessage);

export default router;