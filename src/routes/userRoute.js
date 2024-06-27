import { Router } from "express";
import  * as userController from '../controllers/userController.js';

const router = Router();

router.post('/register', userController.createUser)

export default router;
