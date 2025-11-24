import express from "express";
import { setupLogging } from "./logging.js";
import { setupProxies } from "./proxy.js";


const app = express();
const port = process.env.PORT || 5000;

setupLogging(app);
setupProxies(app);

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("API Gateway is running");
});