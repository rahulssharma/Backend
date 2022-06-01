import User from '../models/User.js';
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const register=async(req,res,next)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser= new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
    })

    try{
        await newUser.save()
        res.status(200).send("User has been created")
    }catch(err){
        next(err)
    }  

}

export const Login=async(req,res,next)=>{
    try{
     const user=await User.findOne({
         username:req.body.username
     });
     if(!user) return next(createError(404,"User not Found!"))
     const isPasswordCorrect=await bcrypt.compare(req.body.password, user.password)
     const token=jwt.sign({id:user._id,isAdmin:user.isAdmin}, process.env.JWT);

     if(!isPasswordCorrect) return next(createError(400,"Wrong Password or username!"))
     const {password, isAdmin, ...otherDetail}=user._doc;
    res.cookie("access_token",token,{httpOnly: true}).status(200).json(otherDetail)
    }catch(err){
        next(err)
    }  

}

export const Logout=async(req,res,next)=>{
    try{
        res.render('login');
    }catch(err){
        next(err)
    }
}


