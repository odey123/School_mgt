const mongoose = require('mongoose');

// Define the FoodMenu schema
const FoodMenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: String, required: true },
  totalOrder: { type: String, required: true },
  interest: { type: String, required: true },
  type: { type: String, enum: ['breakfast', 'lunch', 'snack'], required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  ingredients: { type: String, required: true },
  nutrition: { type: String, required: true },
});

// Export the FoodMenu model
module.exports = mongoose.model('FoodMenu', FoodMenuSchema);
