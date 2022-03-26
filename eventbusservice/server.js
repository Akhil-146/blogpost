import express from "express";
import cors from "cors";
import events from "./routes/Events.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ status: "200", message: "Event Bus Service is up and running" });
});

app.use("/api/events", events);

app.listen("5046", () => {
  console.log("Event Bus Service is Listening on Port 5046");
});
