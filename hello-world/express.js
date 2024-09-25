import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  let rota = 3000;
  res.send(`My little server rota ${rota}`);
});

app.listen(port, () => {
  console.log("Server running at http://localhost:3000/");
});
