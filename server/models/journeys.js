import mongoose from "mongoose";
import User from "./User.js";

// Enumeration of possible stage types within a journey
const stageTypes = Object.freeze({
  JOURNEY: 0,
  ACCOMODATION: 1,
  NOTE: 2,
  SIGHT: 3,
});

// A single segment of a journey (a leg, stay, note or sight)
const stagesSchema = new mongoose.Schema({
  type: {
    // One of the stageTypes values above
    type: Number,
    enum: Object.values(stageTypes),
    required: true,
  },
  stageStart: {
    type: String,
    trim: true,
  },
  stageEnd: {
    type: String,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  address: {
    street: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
  },
  note: {
    type: String,
    trim: true,
  },
  trainConnection: {
    // Raw connection payload from the public transport API
    type: Object,
  },
});

// A trip owned by a user, composed of an ordered list of stages
const journeysSchema = new mongoose.Schema({
  ownerId: {
    // Reference to the User who owns this journey
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  startLocation: {
    type: String,
    required: true,
    trim: true,
  },
  destinationLocation: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  stages: {
    type: [stagesSchema],
  },
});

// Export the journeys model
export default mongoose.model("Journey", journeysSchema);
