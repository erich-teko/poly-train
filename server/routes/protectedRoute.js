import express from "express";
import checkAuth from "../middleware/auth.js";
import Journey from "../models/journeys.js";
import User from "../models/User.js";

const router = express.Router();

// A protected route is define here
router.get("/profile", checkAuth, (req, res) => {
  // Access user data through req.userData
  res.json({ message: "You are authenticated" });
});

router.post("/journeys", checkAuth, async (req, res) => {
  try {
    const { startLocation, destinationLocation, startDate, endDate, stages } = req.body;
    console.log(startLocation);
    console.log(req.userData.userId);
    console.log(destinationLocation);
    console.log(startDate);
    console.log(endDate);
    console.log(stages);
    const ownerId = req.userData.userId;
    const journey = new Journey({
      ownerId,
      startLocation,
      destinationLocation,
      startDate,
      endDate,
      stages,
    });
    console.log(journey);
    await journey.save();
    res.status(201).json(journey);
  } catch (error) {
    res.status(500).json({ error: "Journey failed to save" });
  }
});

export default router;
