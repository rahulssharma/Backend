import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/user.js";
import { verifyToken,verifyUser,verifyAdmin, logout } from "../utils/verifyToken.js";
const router=express.Router()

router.get("/checkauthentication", verifyToken,(req,res,next)=>{
    res.send("Hello user You are Logged in!")
})


router.get("/checkuser/:id" , verifyUser,(req,res,next)=>{
    res.send("Hello user You are Logged in and you can delete your account")
})

router.get("/checkadmin/:id" , verifyAdmin,(req,res,next)=>{
    res.send("Hello user You are Logged in and you can delete your account")
})

// router.post("/logout" , logout,(req,res,next)=>{
//     res.send("Hello user You are Logged out")
// })

router.put('/user/:id',verifyUser, updateUser )

router.delete('/user/:id',verifyUser, deleteUser)

router.get('/user/:id',verifyUser, getUser)

router.get('/', verifyAdmin, getAllUser)

export default router;