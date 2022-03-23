import express from "express";
import { randomBytes } from "crypto";

const router = express.Router();

const comments = {};

router.get("/:id/comments", (req, res) => {
  res.json({
    status: "200",
    message: "Comments Retrieved Successfully",
    data: comments[req.params.id] || [],
  });
});

router.post("/:id/comments", (req, res) => {
  let newid = randomBytes(4).toString("hex");
  const postid = req.params.id;
  //let comment = comments[postid] ? comments[postid] : [];
  let comment = comments[postid] || [];
  comment.push({
    id: newid,
    postid,
    title: req.body.title,
  });
  comments[postid] = comment;

  res.json({ status: "201", message: "Comment Created Successfully" });
});

export default router;
