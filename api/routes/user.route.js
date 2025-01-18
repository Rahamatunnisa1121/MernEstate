import express from 'express';
import {test,updateUserInfo,deleteUserInfo} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router=express.Router();
router.get('/test',test);
router.post('/update/:id',verifyToken,updateUserInfo);
router.delete('/delete/:id',verifyToken,deleteUserInfo);
export default router;