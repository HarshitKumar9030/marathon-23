const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const Location = require("./models/location");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());



const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/location", (req, res) => {
  const location = new Location({
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });

  location.save((error) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Location updated");
    }
  });
});

app.get("/location", (req, res) => {
  Location.findOne()
    .sort({ timestamp: -1 })
    .exec((error, location) => {
      if (error) {
        res.send(error);
      } else {
        res.send(location);
      }
    });
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
