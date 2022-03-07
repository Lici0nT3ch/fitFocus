const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
  name: { type: String, required: true },
  details: { type: String, required: true },
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model('Workout', workoutSchema);
