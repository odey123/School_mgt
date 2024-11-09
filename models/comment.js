const mongoose = require('mongoose');


const CommentsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  text: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now }, 
});


module.exports = mongoose.model('Comments', CommentsSchema);
