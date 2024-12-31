import express from 'express';
const router=express.Router();
import {signup} from '../controllers/auth.controller.js';
import { signin } from '../controllers/auth.controller.js';
router.post('/signup',signup);
router.post('/signin',signin);
export default router;