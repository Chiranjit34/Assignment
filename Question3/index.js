const express = require("express");
const mongoose = require("mongoose");
const Datas = require("./models/dataModel");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/data", async (req, res) => {
  const { password, answer } = req.body;
  const newData = new Datas({
    password: password,
    answer: answer,
  });
  await newData.save();
  res.json({ msg: "Data saved successfully!" });
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
