import axios from "axios";
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "200", message: "Moderation Service is up and running" });
});

app.post("/api/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.title.toLowerCase().includes("orange")
      ? "rejected"
      : "approved";

    try {
      await axios.post("http://localhost:5046/api/events", {
        type: "CommentModerated",
        data: { id: data.id, postid: data.postid, title: data.title, status },
      });
    } catch (error) {
      res.json({
        status: 500,
        message: `OOPS Something Went Wrong ${error.message}`,
      });
      console.error(error);
    }
  }
  res.json({ status: "200", message: "Event Received" });
});

app.listen("5048", () => {
  console.log("Moderation Service is Listening on Port 5048");
});
