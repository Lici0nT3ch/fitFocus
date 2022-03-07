const express = require("express");
const multer = require("multer");

const Workout = require("../models/workout");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "api/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const workout = new Workout({
      name: req.body.name,
      details: req.body.details,
      imagePath: url + "/images/" + req.file.filename
    });
    workout.save().then(createdWorkout => {
      res.status(201).json({
        message: "Workout added successfully",
        workout: {
          ...createdWorkout,
          id: createdWorkout._id
        }
      });
    });
  }
);

router.put("/:id",
multer({ storage: storage }).single("image"),
  (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const workout = new Workout({
    _id: req.body.id,
    name: req.body.name,
    details: req.body.details,
    imagePath: imagePath
  });
  console.log(workout);
  Workout.updateOne({ _id: req.params.id }, workout).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
 }
);

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const workoutQuery = Workout.find();
  let fetchedWorkouts;
  if (pageSize && currentPage) {
    workoutQuery.skip(pageSize * (currentPage -1)).limit(pageSize);
  }
  workoutQuery
    .then(documents => {
      fetchedWorkouts = documents;
      return Workout.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Workouts fetched successfully!",
        workouts: fetchedWorkouts,
        maxWorkouts : count
    });
  });
});

router.get("/:id", (req, res, next) => {
  Workout.findById(req.params.id).then(workout => {
    if (workout) {
      res.status(200).json(workout);
    } else {
      res.status(404).json({ message: "Workout not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Workout.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Workout deleted!" });
  });
});

module.exports = router;
