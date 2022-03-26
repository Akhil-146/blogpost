import express from "express";
import { randomBytes } from "crypto";
import axios from "axios";

const router = express.Router();

const posts = [];

router.get("/posts", (req, res) => {
  res.json({
    status: "200",
    message: "Posts Retreived Successfully",
    data: posts,
  });
});

router.post("/posts", async (req, res) => {
  let id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts.push({ id, title });
  try {
    await axios.post("http://localhost:5046/api/events", {
      type: "PostCreated",
      data: { id, title },
    });
    res.json({ status: "201", message: "Post Created Successfully" });
  } catch (error) {
    res.json({
      status: 500,
      message: `OOPS Something Went Wrong ${error.message}`,
    });
    console.error(error);
  }
});

router.post("/events", (req, res) => {
  console.log(`Event Created with type ${req.body.type}`);
  res.json({ status: "200", message: "Event Received" });
});

export default router;
