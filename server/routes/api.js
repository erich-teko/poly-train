import express from "express";
import checkAuth from "../middleware/auth.js";
import Journey from "../models/journeys.js";
import User from "../models/User.js";
import { getStations, getConnections } from "../controllers/publicTransportAPI.js";

const router = express.Router();

/**
 * Create a new journey owned by the authenticated user.
 * @route POST /journeys
 * @body {object} startLocation, destinationLocation, startDate, endDate, stages
 * @returns {201} The created journey.
 * @returns {500} If the journey fails to save.
 */
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

/**
 * Update an existing journey owned by the authenticated user.
 * @route PUT /journeys/:journeyId
 * @param {string} journeyId - The ID of the journey to update.
 * @body {object} startLocation, destinationLocation, startDate, endDate, stages
 * @returns {200} The updated journey.
 * @returns {404} If the journey does not exist.
 * @returns {403} If the user does not own the journey.
 * @returns {500} If the update fails.
 */
router.put("/journeys/:journeyId", checkAuth, async (req, res) => {
  try {
    const journeyId = req.params.journeyId;
    const { startLocation, destinationLocation, startDate, endDate, stages } = req.body;
    const journey = await Journey.findById(journeyId);
    if (!journey) {
      return res.status(404).json({ error: "Journey not found" });
    }
    // Check if the authenticated user is the owner of the journey
    if (journey.ownerId.toString() !== req.userData.userId) {
      return res.status(403).json({ error: "Unauthorized to update this journey" });
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

/**
 * Delete a journey owned by the authenticated user.
 * @route DELETE /journeys/:journeyId
 * @param {string} journeyId - The ID of the journey to delete.
 * @returns {204} On successful deletion.
 * @returns {404} If the journey does not exist.
 * @returns {403} If the user does not own the journey.
 * @returns {500} If the deletion fails.
 */
router.delete("/journeys/:journeyId", checkAuth, async (req, res) => {
  try {
    const journeyId = req.params.journeyId;
    const journey = await Journey.findById(journeyId);
    if (!journey) {
      return res.status(404).json({ error: "Journey not found" });
    }
    // Check if the authenticated user is the owner of the journey
    if (journey.ownerId.toString() !== req.userData.userId) {
      return res.status(403).json({ error: "Unauthorized to delete this journey" });
    }
    await Journey.findByIdAndDelete(journeyId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete journey" });
  }
});

/**
 * Retrieve all journeys owned by the authenticated user.
 * @route GET /journeys
 * @returns {200} An array of the user's journeys.
 * @returns {500} If retrieval fails.
 */
router.get("/journeys", checkAuth, async (req, res) => {
  try {
    const ownerId = req.userData.userId;
    const journeys = await Journey.find({ ownerId });
    res.status(200).json(journeys);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve journeys" });
  }
});

/**
 * Retrieve a single journey owned by the authenticated user.
 * @route GET /journeys/:journeyId
 * @param {string} journeyId - The ID of the journey to retrieve.
 * @returns {200} The requested journey.
 * @returns {404} If the journey does not exist.
 * @returns {403} If the user does not own the journey.
 * @returns {500} If retrieval fails.
 */
router.get("/journeys/:journeyId", checkAuth, async (req, res) => {
  try {
    const journeyId = req.params.journeyId;
    const journey = await Journey.findById(journeyId);
    if (!journey) {
      return res.status(404).json({ error: "Journey not found" });
    }
    // Check if the authenticated user is the owner of the journey
    if (journey.ownerId.toString() !== req.userData.userId) {
      return res.status(403).json({ error: "Unauthorized to access this journey" });
    }
    res.status(200).json(journey);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve journey" });
  }
});

/**
 * Search for public transport stations matching a query.
 * @route GET /public-transport/stations
 * @query {string} station - The station name or search term.
 * @returns {200} Matching stations.
 * @returns {500} If the lookup fails.
 */
router.get("/public-transport/stations", checkAuth, async (req, res) => {
  try {
    const station = req.query.station;
    const stations = await getStations(station);
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Retrieve public transport connections between two stations.
 * @route GET /public-transport/connections
 * @query {string} startStation - The departure station.
 * @query {string} endStation - The arrival station.
 * @query {string} travelDate - The date of travel.
 * @query {string} travelTime - The time of travel.
 * @query {string} isArrivalTime - Whether travelTime is an arrival time.
 * @returns {200} Matching connections.
 * @returns {500} If the lookup fails.
 */
router.get("/public-transport/connections", checkAuth, async (req, res) => {
  try {
    const startStation = req.query.startStation;
    const endStation = req.query.endStation;
    const travelDate = req.query.travelDate;
    const travelTime = req.query.travelTime;
    const isArrivalTime = req.query.isArrivalTime;
    const connections = await getConnections(startStation, endStation, travelDate, travelTime, isArrivalTime);
    res.status(200).json(connections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Update the authenticated user's avatar style.
 * @route PUT /user/avatar-style
 * @body {string} avatarStyle - The new avatar style.
 * @returns {200} The updated avatar style.
 * @returns {404} If the user does not exist.
 * @returns {500} If the update fails.
 */
router.put("/user/avatar-style", checkAuth, async (req, res) => {
  try {
    const { avatarStyle } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userData.userId,
      { avatarStyle },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ avatarStyle: user.avatarStyle });
  } catch (error) {
    res.status(500).json({ error: "Failed to update avatar style" });
  }
});

export default router;
