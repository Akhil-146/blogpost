import express from "express";

const router = express.Router();

const posts = [];

export function handleEvents({ type, data }) {
  if (type === "PostCreated") {
    posts.push({ id: data.id, title: data.title, comments: [] });
  }

  if (type === "CommentCreated") {
    posts.map((post) => {
      if (post.id === data.postid) {
        post.comments.push({
          id: data.id,
          postid: data.postid,
          title: data.title,
          status: data.status,
        });
      }
    });
  }

  if (type === "CommentUpdated") {
    posts.map((post) => {
      if (post.id === data.postid) {
        post.comments.map((comment) => {
          if (comment.id === data.id) comment.status = data.status;
        });
      }
    });
  }
}

router.post("/events", (req, res) => {
  handleEvents(req.body);
  res.json({
    status: "200",
    message: `Event Processed with title ${req.body.type}`,
  });
});

router.get("/posts", (req, res) => {
  res.json({
    status: "200",
    message: "Post Retrieved Successfully",
    data: posts,
  });
});

export default router;
