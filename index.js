import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import taskRoute from "./routes/task.route.js";

const app = express();

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect("mongodb://localhost:27017/todo_application")
  .then(() => console.log("Connected to the todo_application database successfully"))
  .catch((error) => console.error("Connection error:", error));

const port = process.env.PORT || 3000;

app.get("/", taskRoute);

app.get("/test", (req, res) => {
  res.send("API work wells!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
