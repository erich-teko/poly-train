import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();
const secretKey = process.env.JWT_SECRET;

// Registration routes
/**
 * Register a new user with a hashed password.
 * @route POST /register
 * @body {string} username - The desired username.
 * @body {string} email - The user's email address.
 * @body {string} password - The plaintext password to hash and store.
 * @returns {201} On successful registration.
 * @returns {500} If registration fails.
 */
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
});

// Logout endpoint
/**
 * Log the user out by clearing the auth cookie.
 * @route POST /logout
 * @returns {200} On successful logout.
 */
router.post('/logout', (req, res) => {
    /* 
    You may want to perform additional
    cleanup or session invalidation here
     */
    res.clearCookie('token').send('Logged out successfully');
});

// Login endpoint
/**
 * Authenticate a user and issue a JWT token.
 * @route POST /login
 * @body {string} email - The user's email address.
 * @body {string} password - The user's plaintext password.
 * @returns {200} The JWT token and user details.
 * @returns {401} If authentication fails.
 * @returns {500} If an unexpected error occurs.
 */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Authentication failed try Again" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Authentication failed try Again" });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
            expiresIn: "8h",
        });

        res.status(200).json({
            token,
            userId: user._id,
            username: user.username,
            avatarStyle: user.avatarStyle,
        });
    } catch (error) {
        res.status(500).json({ error: "Authentication failed try Again" });
    }
});

export default router;
