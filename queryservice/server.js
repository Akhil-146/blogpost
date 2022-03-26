import express from "express";
import cors from "cors";
import axios from "axios";
import query, { handleEvents } from "./routes/query.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ status: "200", message: "Query Service is up and running" });
});

app.use("/api", query);

app.listen("5044", async () => {
  try {
    const response = await axios.get("http://localhost:5046/api/events");
    const events = response.data.data;
    events.map((event) => {
      handleEvents(event);
    });
  } catch (error) {
    console.error(error);
  }

  console.log("Query Service is Listening on Port 5044");
});
