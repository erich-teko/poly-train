import express from "express";
import mongoose, { Schema } from "mongoose";
import "dotenv/config";

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const user = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
    const serverInfo = {
        name: "Poly-Train Server",
        version: "1.0.0",
        description: "This is a sample server for the Poly-Train application.",
        developer: ["Adrian", "Erich", "Simon"],
    };

    res.send(serverInfo);
});

app.get("/users", async (req, res) => {
    try {
        const users = await user.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/users", async (req, res) => {
    const newUser = new user(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
