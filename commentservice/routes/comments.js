import express from "express";
import { randomBytes } from "crypto";
import axios from "axios";

const router = express.Router();

const comments = {};

router.get("/posts/:id/comments", (req, res) => {
  res.json({
    status: "200",
    message: "Comments Retrieved Successfully",
    data: comments[req.params.id] || [],
  });
});

router.post("/posts/:id/comments", async (req, res) => {
  let id = randomBytes(4).toString("hex");
  const postid = req.params.id;
  const { title } = req.body;
  //let comment = comments[postid] ? comments[postid] : [];
  let comment = comments[postid] || [];
  comment.push({
    id,
    postid,
    title,
    status: "pending",
  });
  comments[postid] = comment;

  try {
    await axios.post("http://localhost:5046/api/events", {
      type: "CommentCreated",
      data: { id, postid, title, status: "pending" },
    });
    res.json({ status: "201", message: "Comment Created Successfully" });
  } catch (error) {
    res.json({
      status: 500,
      message: `OOPS Something Went Wrong ${error.message}`,
    });
    console.error(error);
  }
});

router.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    comments[data.postid].map((comment) => {
      if (comment.id === data.id) comment.status = data.status;
    });
    await axios.post("http://localhost:5046/api/events", {
      type: "CommentUpdated",
      data,
    });
  }
  res.json({ status: "200", message: "Event Received" });
});

export default router;
