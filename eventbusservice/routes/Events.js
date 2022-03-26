import axios from "axios";
import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const eventdata = req.body;
    await axios.post("http://localhost:5040/api/events", eventdata);
    await axios.post("http://localhost:5042/api/events", eventdata);
    await axios.post("http://localhost:5044/api/events", eventdata);
    await axios.post("http://localhost:5048/api/events", eventdata);
  } catch (error) {
    console.error(error);
  }
  res.json({ status: "200", message: "Event Created Successfully" });
});

export default router;
