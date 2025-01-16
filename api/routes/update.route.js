import express from 'express';
const router=express.Router();
import {avatar} from '../controllers/avatar.controller.js';
router.post('/avatar',avatar);
export default router;