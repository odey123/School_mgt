// course.js
const mongoose = require('mongoose');
const { Status } = require('../enums');

const CourseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  class: String,
  code: String,
  status: { type: String, enum: Status, default: 'normal' }
});

const Course = mongoose.models.user || mongoose.model('course', CourseSchemaSchema);
module.exports = Course
