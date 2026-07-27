import express from "express";
import checkAuth from "../middleware/auth.js";
import Journey from "../models/journeys.js";
import User from "../models/User.js";
import {
  getStations,
  getConnections,
} from "../controllers/publicTransportAPI.js";

const router = express.Router();

// A protected route is define here
router.get("/profile", checkAuth, (req, res) => {
  // Access user data through req.userData
  res.json({ message: "You are authenticated" });
});

router.post("/journeys", checkAuth, async (req, res) => {
  try {
    const { startLocation, destinationLocation, startDate, endDate, stages } =
      req.body;
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

router.put("/journeys/:journeyId", checkAuth, async (req, res) => {
  try {
    const journeyId = req.params.journeyId;
    const { startLocation, destinationLocation, startDate, endDate, stages } =
      req.body;
    const journey = await Journey.findById(journeyId);
    if (!journey) {
      return res.status(404).json({ error: "Journey not found" });
    }
    // Check if the authenticated user is the owner of the journey
    if (journey.ownerId.toString() !== req.userData.userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to update this journey" });
    }
    journey.startLocation = startLocation;
    journey.destinationLocation = destinationLocation;
    journey.startDate = startDate;
    journey.endDate = endDate;
    journey.stages = stages;
    await journey.save();
    res.status(200).json(journey);
  } catch (error) {
    res.status(500).json({ error: "Failed to update journey" });
  }
});

router.delete("/journeys/:journeyId", checkAuth, async (req, res) => {
  try {
    const journeyId = req.params.journeyId;
    const journey = await Journey.findById(journeyId);
    if (!journey) {
      return res.status(404).json({ error: "Journey not found" });
    }
    // Check if the authenticated user is the owner of the journey
    if (journey.ownerId.toString() !== req.userData.userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this journey" });
    }
    await Journey.findByIdAndDelete(journeyId);
    res.status(200).json({ message: "Journey deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete journey" });
  }
});

router.get("/journeys", checkAuth, async (req, res) => {
  try {
    const ownerId = req.userData.userId;
    const journeys = await Journey.find({ ownerId });
    res.status(200).json(journeys);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve journeys" });
  }
});

router.get("/journeys/:journeyId", checkAuth, async (req, res) => {
  try {
    const journeyId = req.params.journeyId;
    const journey = await Journey.findById(journeyId);
    if (!journey) {
      return res.status(404).json({ error: "Journey not found" });
    }
    // Check if the authenticated user is the owner of the journey
    if (journey.ownerId.toString() !== req.userData.userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized to access this journey" });
    }
    res.status(200).json(journey);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve journey" });
  }
});

router.get("/public-transport/stations", checkAuth, async (req, res) => {
  try {
    const station = req.query.station;
    const stations = await getStations(station);
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve journey" });
  }
});

router.get("/public-transport/connections", checkAuth, async (req, res) => {
  try {
    const startStation = req.query.startStation;
    const endStation = req.query.endStation;
    const travelDate = req.query.travelDate;
    const travelTime = req.query.travelTime;
    const isArrivalTime = req.query.isArrivalTime;
    const connections = await getConnections(
      startStation,
      endStation,
      travelDate,
      travelTime,
      isArrivalTime,
    );
    res.status(200).json(connections);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve journey" });
  }
});

export default router;
