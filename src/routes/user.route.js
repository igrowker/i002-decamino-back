import { Router } from "express";
import  * as userController from '../controllers/user.controller.js';

const router = Router();

router.post('/register', userController.POSTUserRegister)
.post('/login', userController.POSTUserLogin)
.post('/2fa/setup', userController.POST2faSetup)

export default router;
