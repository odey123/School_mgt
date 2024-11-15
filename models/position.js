// position.js
const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  class: String,
  role: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' } // Reference to Course schema
});

const Position = mongoose.models.user || mongoose.model('position', PositionSchema);

module.exports = Position;
 