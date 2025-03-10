import express from 'express';
import { createListing,deleteListing,updateListing, getListing, getListings } from '../controllers/listing.controller.js';
import { insertImage } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js'; 
import multer from 'multer';
import path from 'path';
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'listingImages/');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    }
});
const upload=multer({
    storage:storage,
    limits: { fileSize: 10 * 1024 * 1024 }
}); //initilaizing multer with defined storage config
const router=express.Router();
router.post('/create',verifyToken,createListing);
router.post('/insertImage',upload.single('image'),insertImage);
router.delete('/delete/:id',verifyToken,deleteListing);
router.put('/update/:id',verifyToken,updateListing);
router.get('/getListing/:id',getListing);
router.get('/getListings',getListings);
export default router;