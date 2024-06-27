import { Router } from "express";
import  * as userController from '../controllers/user.controller.js';

const router = Router();

router.post('/register', userController.POSTUserRegister)
.post('/login', userController.POSTUserLogin)

export default router;
