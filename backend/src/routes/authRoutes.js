import express from 'express';
import { registerUser, loginUser, forgotPassword, resetPassword } from '../controllers/authController.js';
import { validateRegistration, validateLogin, validateForgotPassword, validateResetPassword } from '../middlewares/validation.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

// Register a new user
router.post('/register', validateRegistration, registerUser);

// Login an existing user
router.post('/login', validateLogin, loginUser);

// Forgot password
router.post('/forgot-password', validateForgotPassword, forgotPassword);

// Reset password
router.put('/reset-password/:token', validateResetPassword, resetPassword);

// Get the authenticated user's profile
router.get('/profile', auth, (req, res) => {
  res.json({ user: req.user });
});

export default router;