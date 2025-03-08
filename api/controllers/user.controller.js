import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
export const test = (req,res)=>{
    res.json({
        message:"Hello world!"
    });
};
export const updateUserInfo=async (req,res,next)=>{
    if(req.user.id !== req.params.id)
    {
        return next(errorHandler(401,'You can only update your account, Donot try to update other accounts!'));
    }
    try
    {
        if(req.body.password)
        {
            req.body.password=bcryptjs.hashSync(req.body.password,10);
        }
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{
        $set:
        {
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            avatar:req.body.avatar
        }},
        {new:true});
        const {password,...rest}=updatedUser._doc;
        res.status(200).json(rest);
    }
    catch(error)
    {
        next(error);
    }  
};
export const deleteUserInfo=async(req,res,next)=>{
    if(req.user.id !== req.params.id)
        {
            return next(errorHandler(401,'You can only deletee your account, Donot try to delete others account!'));
        }
        try
        {
            await User.findByIdAndDelete(req.params.id);
            res.clearCookie('accessToken');
            res.status(200).json('User has been deleted');
        }
        catch(error)
        {
            next(error);
        }  
};
export const getUserListing=async(req,res,next)=>{
    try
    {
        if(req.user.id!==req.params.id)
        {
            return next(errorHandler(401,'You can view your own listings only!'));
        }
        try
        {
            const listings=await Listing.find({userRef:req.params.id});
            res.status(200).json(listings);
        }
        catch(err)
        {
            next(err);
        }
    }
    catch(err)
    {
        next(err);
    }
};
export const getUser=async(req,res,next)=>{
    try
    {
        const user=await User.findById(req.params.id);
        if(!user)return next(errorHandler(404,'User Not found!'));
        const {password:hiddenPass,...rest}=user._doc;
        res.status(200).json(rest);
    }
    catch(err)
    {
        next(err);
    }
};