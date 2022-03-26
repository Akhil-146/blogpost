import express from "express";
import posts from "./routes/posts.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ status: "200", message: "Post Service is up and running" });
});

app.use("/api", posts);

app.listen("5040", () => {
  console.log("Post Service is Listening on Port 5040");
});
