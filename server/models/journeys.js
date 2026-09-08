import mongoose from "mongoose";
import User from "./User.js";

const stageTypes = Object.freeze({
  JOURNEY: 0,
  ACCOMODATION: 1,
  NOTE: 2,
  SIGHT: 3,
});

const stagesSchema = new mongoose.Schema({
  type: {
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
    type: Object,
  },
});

const journeysSchema = new mongoose.Schema({
  ownerId: {
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
    //required: true,
  },
});

// Export the journeys model
export default mongoose.model("Journey", journeysSchema);
