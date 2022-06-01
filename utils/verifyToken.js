import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

export const verifyToken= (req,res,next)=>{

    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"You are not authenticated!"))
    }

    jwt.verify(token,process.env.JWT,(err,user)=>{
    if(err){
        return next(createError(403,"Token is not valid!"))
    }
    else{
        next()
    }
    })
}


export const verifyUser = (req,res,next)=>{
    verifyToken(req,res ,next, ()=>{
        if (req.user.id === req.params.id || req.user.isAdmin ){
            next();
            req.user=user
        }else{
            return next(createError(403,"You are not authorized"))

        }
    })
}

export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res ,next, ()=>{
        if (req.user.isAdmin ){
            next()
        }else{
            return next(createError(403,"You are not authorized"))

        }
    })
}


export const logout = (req,res,next)=>{
    verifyUser(req, res ,next, async()=>{
        if (req.user ){
            res.clearCookie('access_token')
            console.log("Logout Successful");
            await user.save();
            navigate('/login');
            
        }else{
            return next(createError(403,"You are not authorized"))

        }
    })
}
