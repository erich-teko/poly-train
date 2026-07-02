import express from "express";
import checkAuth from "../middleware/auth.js";

const router = express.Router();

// A protected route is define here
router.get("/profile", checkAuth, (req, res) => {
    // Access user data through req.userData
    res.json({ message: "You are authenticated" });
});

export default router;
