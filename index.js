import express from "express";

const app = express();

app.set("views", "views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/test", (req, res) => {
  res.send("API work wells!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
