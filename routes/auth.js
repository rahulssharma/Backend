import express from "express";
const router=express.Router();
import {Login, register, Logout} from '../controllers/auth.js';
import { logout } from "../utils/verifyToken.js";


router.post("/register" , register);
router.post("/login" , Login);
// router.post("/logout", logout );
router.post("/logout" , logout,(req,res,next)=>{
    res.send("Hello user You are Logged out")
})



export default router;