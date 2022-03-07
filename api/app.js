const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Workout = require("./models/workout");

const app = express();

mongoose
  .connect(
    "mongodb://127.0.0.1/FitFocus"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*Middleware*/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/workouts", (req, res, next) => {
  const workout = new Workout({
    name: req.body.name,
    details: req.body.details
  });
  workout.save().then(createdWorkout => {
    res.status(201).json({
      message: "Workout added successfully",
      workoutId: createdWorkout._id
    });
  });
});

app.get("/api/workouts", (req, res, next) => {
  workout.find().then(documents => {
    res.status(200).json({
      message: "Workouts fetched successfully!",
      workouts: documents
    });
  });
});

app.delete("/api/workouts/:id", (req, res, next) => {
  workout.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Workout deleted!" });
  });
});

module.exports = app;
