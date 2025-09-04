import { Router } from 'express';
import { AuthController } from '../components/authen/controller/authenController';
import { AuthenService } from '../components/authen/service/authenService';

const router = Router();
const authController = new AuthController(new AuthenService());

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', (req, res) => authController.login(req, res));

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: User logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', (req, res) => authController.logout(req, res));

/**
 * @swagger
 * /get-username:
 *   get:
 *     summary: Get current user's username
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Username retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.get('/get-username', (req, res) => authController.getUserName(req, res));

export default router;