import mongoose from "mongoose";

// Application user account; password is stored hashed (see auth route)
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
        // Style identifier used to generate the user's avatar on the client
        type: String,
        default: "identicon",
    },
});

// Export the user model
export default mongoose.model("User", userSchema);
