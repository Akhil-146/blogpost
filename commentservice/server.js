import express from "express";
import comments from "./routes/comments.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ Status: "200", Message: "Comments Service is up and running" });
});

app.use("/api", comments);

app.listen("5042", () => {
  console.log("Comments Service is Listening on Port 5042");
});
