import axios from "axios";
import express from "express";

const router = express.Router();

const events = [];

router.post("/events", async (req, res) => {
  const eventdata = req.body;
  events.push(eventdata);
  await axios
    .post("http://localhost:5040/api/events", eventdata)
    .catch((error) => {
      console.error(error);
    });
  await axios
    .post("http://localhost:5042/api/events", eventdata)
    .catch((error) => {
      console.error(error);
    });
  await axios
    .post("http://localhost:5044/api/events", eventdata)
    .catch((error) => {
      console.error(error);
    });
  await axios
    .post("http://localhost:5048/api/events", eventdata)
    .catch((error) => {
      console.error(error);
    });

  res.json({ status: "200", message: "Event Created Successfully" });
});

router.get("/events", (req, res) => {
  res.json({
    status: "200",
    message: "Data Retrieved Successfully",
    data: events,
  });
});

export default router;
