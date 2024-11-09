// event.js
const mongoose = require('mongoose');
const { Status } = require('./enums');

const EventSchema = new mongoose.Schema({
  date: String,
  title: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: false }, // Reference to Course schema
  class: { type: String, required: false },
  startTime: Number,
  endTime: Number,
  status: { type: String, enum: Status, default: 'normal' }
});

module.exports = mongoose.model('Event', EventSchema);
