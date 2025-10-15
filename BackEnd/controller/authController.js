import express from 'express';
const router = express.Router();

import User from '../models/userModel.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const createUserValidation = [
    body('name')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long'),

    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter a valid email'),

    body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be at least 5 characters long')
];

export const loginValidation = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter a valid email'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

const checkValidationErrors = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    return null;
};

export const createUser = async (req, res) => {
    let success = false;

    try {
        // Check for validation errors
        const validationError = checkValidationErrors(req, res);
        if (validationError) return;

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success,
                error: "User with this email already exists"
            });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = await User.create({
            name: name.trim(),
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        // Generate auth token
        const authToken = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '24h' });

        // Sending Cookie
        res.cookie('token', authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Send success response
        success = true;
        res.status(201).json({
            success,
            authToken,
            message: "User created successfully"
        });

    } catch (error) {
        console.error('Create user error:', error.message);
        res.status(500).json({
            success,
            error: "Internal Server Error"
        });
    }
}

export const login = async (req, res) => {
    let success = false;

    try {
        // Check for validation errors
        const validationError = checkValidationErrors(req, res);
        if (validationError) return;

        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({
                success,
                error: "Please try to login with correct credentials"
            });
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success,
                error: "Please try to login with correct credentials"
            });
        }

        // Generate auth token
        const authToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '24h' });

        // Sending Cookie
        res.cookie('token', authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // Send success response
        success = true;
        res.json({
            success,
            authToken,
            message: "Login successful"
        });

    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({
            success,
            error: "Internal Server Error"
        });
    }
}

export const getUser = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find user by ID (exclude password)
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        // Send user data
        res.json({
            success: true,
            user
        });

    } catch (error) {
        console.error('Get user error:', error.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

export default router;