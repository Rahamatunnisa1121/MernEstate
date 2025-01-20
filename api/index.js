import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import updateRouter from './routes/update.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';//initilaizing
import path from 'path';
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to Database!")
}).catch((err)=>{
    console.log(err);
});
const app=express();
app.use('/uploads', express.static(path.resolve('uploads')));
app.use(express.json());
app.use(cookieParser());
app.listen(3000,()=>{
    console.log("Server running...");
});
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/update",updateRouter);
app.use("/api/listing",listingRouter);
//middleware
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal server error!';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});