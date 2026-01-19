import express from "express";
import cors from "cors";
import { setupLogging } from "./logging.js";
import { setupProxies } from "./proxy.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://front:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

setupLogging(app);
setupProxies(app);

app.get("/", (req, res) => {
  res.send("API Gateway is running");
});

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
