import multer from 'multer';
import path from 'path';
import User from '../models/user.model.js';
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    }
});

const upload=multer({
    storage:storage,
    limits: { fileSize: 10 * 1024 * 1024 }
}); //initilaizing multer with defined storage config

export const avatar=[upload.single('avatar'),async(req,res)=>{
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);
    try{
        if(!req.file)
        {
            return res.status(400).json({message:"File not uploaded or not found!"});
        }
        const avatarURL=`/uploads/${req.file.filename}`;
        const userID=req.body.userID;
        const user=await User.findById(userID);
        if(!user)
        {
            return res.status(400).json({message:"User not found!"});
        }
        user.avatar=avatarURL;
        await user.save();
        res.status(200).json({
            message:"Avatar updated successfully!",
            avatarURL,
        });
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}];