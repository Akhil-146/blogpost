import axios from "axios";
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "200", message: "Moderation Service is up and running" });
});

const handleEvents = async ({ type, data }) => {
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
};

app.post("/api/events", (req, res) => {
  handleEvents(req.body);
  res.json({ status: "200", message: "Event Received" });
});

app.listen("5048", async () => {
  try {
    const { data } = await axios.get("http://localhost:5046/api/events");
    const events = data.data;
    events.map((event) => {
      handleEvents(event);
    });
  } catch (error) {
    console.error(error);
  }
  console.log("Moderation Service is Listening on Port 5048");
});
