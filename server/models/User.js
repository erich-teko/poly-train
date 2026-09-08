import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatarStyle: {
        type: String,
        default: "identicon",
    },
});

// Export the user model
export default mongoose.model("User", userSchema);
