import express from 'express';
const router = express.Router();
import { createUser, login, getUser, createUserValidation, loginValidation } from '../controller/authController.js';
import userAuth from '../middleware/userAuth.js';

// ROUTE 1: Create a new user
// POST /api/auth/createuser
router.post('/createuser', createUserValidation, createUser);

// ROUTE 2: Login user
// POST /api/auth/login
router.post('/login', loginValidation, login);

// ROUTE 3: Get user details
// POST /api/auth/getuser (login required)
router.post('/getuser', userAuth, getUser);

export default router;