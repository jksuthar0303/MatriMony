const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: String,
  age: Number,
  occupation: String,
  location: String,
  image: String,
});

module.exports = mongoose.model('Profile', ProfileSchema);
