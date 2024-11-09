// course.js
const mongoose = require('mongoose');
const { Status } = require('../enums');

const CourseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  class: String,
  code: String,
  status: { type: String, enum: Status, default: 'normal' }
});

module.exports = mongoose.model('Course', CourseSchema);
