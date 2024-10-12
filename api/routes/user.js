const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../api/models/users"); 

const router = express.Router();

// POST /api/v1/user/signup (Register a new user)
router.post(
    "/signup",
    [
        check("username").notEmpty().withMessage("Username is required"),
        check("email").isEmail().withMessage("Valid email is required"),
        check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        try {
            // Checking the user already exist 
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }

            // Creating the new User
            const newUser = new User({ username, email, password });

            await newUser.save();

            res.status(201).json({
                message: "User created successfully",
                user_id: newUser._id
            });
        } catch (error) {
            res.status(500).json({ message: "Server Error", error });
        }
    }
);

// POST /api/v1/user/login (Login without password encryption)
router.post(
    "/login",
    [
        check("email").isEmail().withMessage("Valid email is required"),
        check("password").exists().withMessage("Password is required")
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Check if the user exists
            const user = await User.findOne({ email, password });
            if (!user) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            res.status(200).json({
                message: "Login successful"
            });
        } catch (error) {
            res.status(500).json({ message: "Server Error", error });
        }
    }
);

module.exports = router;
