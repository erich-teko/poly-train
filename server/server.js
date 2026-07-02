import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

app.get("/", (req, res) => {
    const serverInfo = {
        name: "Poly-Train Server",
        version: "1.0.0",
        description: "This is a sample server for the Poly-Train application.",
        developer: ["Adrian", "Erich", "Simon"],
    };

    res.send(serverInfo);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
