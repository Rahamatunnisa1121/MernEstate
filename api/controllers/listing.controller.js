import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const insertImage=async(req,res,next)=>{
    try{
        if(!req.file)
        {
            return res.status(400).json({message:"File not uploaded or not found!"});
        }
        const imageURL=`/listingImages/${req.file.filename}`;
        // const userID=req.body.userID;
        // const user=await User.findById(userID);
        // if(!user)
        // {
        //     return res.status(400).json({message:"User not found!"});
        // }
        // user.avatar=avatarURL;
        // await user.save();
        res.status(200).json({
            message:"Image updated successfully!",
            imageURL,
        });
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const createListing=async(req,res,next)=>{
    try
    {
        const listing=await Listing.create(req.body);
        return res.status(201).json(listing);
    }
    catch(err)
    {
        next(err);//middleware handles the error
    }
};
export const deleteListing=async(req,res,next)=>{
    const listing=await Listing.findById(req.params.id);
    if(!listing)
    {
        return next(errorHandler(404,'Listing not found!'));
    }
    if(req.user.id!==listing.userRef)
    {
        return next(errorHandler(401,'You can only delete your listings!'));
    }
    try
    {
        await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true, 
            message: 'Item deleted successfully!'
        });
    }
    catch(err)
    {
        next(err);
    }
}