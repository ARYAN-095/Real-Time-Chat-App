import express from "express";
import {login, signup, logout,checkAuth} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { updateProfile } from "../controllers/auth.controller.js";


 const router=express.Router();


 router.post("/signup",signup);

 router.post("/login",login);


 // you can also use get method insted of post in logout route
 router.post("/logout",logout); 



 // this route is not for everyou first it check that the use is logined or not 
 router.put("/update-profile", protectRoute,updateProfile);


 // check if user is authenticalted or not - when we refresh our page we want to check our usr is autheticated or not
 router.get("/check", protectRoute, checkAuth);

 export default router;