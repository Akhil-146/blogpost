import express from "express";
import { randomBytes } from "crypto";

const router = express.Router();

const posts = [];

router.get("/", (req, res) => {
  res.json({
    status: "200",
    message: "Posts Retreived Successfully",
    data: posts,
  });
});

router.post("/", (req, res) => {
  let newid = randomBytes(4).toString("hex");
  posts.push({ id: newid, title: req.body.title });
  res.json({ status: "201", message: "Post Created Successfully" });
});

export default router;
