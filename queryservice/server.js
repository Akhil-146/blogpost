import express from "express";
import cors from "cors";
import query from "./routes/query.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ status: "200", message: "Query Service is up and running" });
});

app.use("/api", query);

app.listen("5044", () => {
  console.log("Query Service is Listening on Port 5044");
});
