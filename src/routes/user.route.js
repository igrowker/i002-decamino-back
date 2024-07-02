import { Router } from "express";
import * as userController from '../controllers/user.controller.js';
import User from "../models/user.model.js";
import { requireAuth, validateUser } from "../middlewares/auth.middleware.js";


const router = Router();
/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 error: El nombre de usuario es requerido
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 500Internal Server Error
 *               example:
 *                 error: "E11000 duplicate key error collection: test.users index: username_1 dup key: { username: \"sasassalkasqwqaslk\" }"
 */
router.post('/register', userController.POSTUserRegister)
.post('/login', userController.POSTUserLogin)
.post('/2fa/setup', requireAuth, userController.POST2faSetup)
.get('/profile', requireAuth, userController.GETUser)
.put('/profile', requireAuth, userController.PUTUser)

export default router;
