import express from "express";
import cookiesRoutes from "./routes/cookies.js";

const app = express();
app.use(express.json());

app.use("/cookies", cookiesRoutes);

app.get('/', (req, res) => res.send('Hello from commands!'));

app.listen(5002, () => {
  console.log("Commands service running on port 5002");
});
