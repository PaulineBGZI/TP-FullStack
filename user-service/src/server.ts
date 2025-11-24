import express from "express";
const app = express();
const port = process.env.PORT || 5001;
app.get("/", (req, res) => res.send("Hello from User Public!"));
app.listen(port, () => console.log(`Server running on port ${port}`));