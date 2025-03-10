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
};

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
};

export const updateListing=async(req,res,next)=>{
    const listing=await Listing.findById(req.params.id);
    if(!listing)
    {
        return next(errorHandler(404,'Listing not found!'));
    }
    if(req.user.id!==listing.userRef)
    {
        return next(errorHandler(401,'You can only update your listings!'));
    }
    try
    {
        const updatedListing=await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.status(200).json(updatedListing);
    }
    catch(err)
    {
        next(err);
    }
};

export const getListing=async(req,res,next)=>{
    try
    {
        const listing=await Listing.findById(req.params.id);
        if(!listing)
        {
            return next(errorHandler(404,'Listing not found!'));
        }
        res.status(200).json(listing);
    }
    catch(err){
        next(err);
    }
};

export const getListings=async(req,res,next)=>{
    try
    {
        const limit=parseInt(req.query.limit) || 9;
        const startIndex=parseInt(req.query.startIndex) || 0;
        
        let offer=req.query.offer;
        if(offer===undefined || offer==='false')
        {
            offer={$in:[false,true]};
        }

        let furnished=req.query.furnished;
        if(furnished===undefined || furnished==='false')
        {
            furnished={$in:[false,true]};
        }

        let parking=req.query.parking;
        if(parking===undefined || parking==='false')
        {
            parking={$in:[false,true]};
        }

        let type=req.query.type;
        if(type===undefined || type==='all')
        {
            type={$in:['rent','sale']};
        }

        const searchTerm=req.query.searchTerm || '';
        const sort=req.query.sort || 'createdAt';
        const order=req.query.order || 'desc';

        const listings=await Listing.find({
            name: {$regex : searchTerm, $options:'i'},//case insensitive -> i
            offer,
            furnished,
            type,
            parking,   
        }).sort(
            {[sort]:order}
        ).limit(limit).skip(startIndex);
        return res.status(200).json(listings);
    }
    catch(err)
    {
        next(err);
    }
};