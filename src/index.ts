import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("heloo guyss, its an honor from scale from zero!");
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on ${process.env.PORT}`),
);
