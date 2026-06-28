import express from "express";
import "dotenv/config";

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(express.json());

app.get("/", (req, res) => {
    const serverInfo = {
        name: "Poly-Train Server",
        version: "1.0.0",
        description: "This is a sample server for the Poly-Train application.",
        developer: [
            "Adrian",
            "Erich",
            "Simon",
        ]
    }

    res.send(serverInfo);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
