const mongoose = require('mongoose');

// Define the FoodOrder schema
const FoodOrderSchema = new mongoose.Schema({
  foodMenu: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodMenu', required: true }, // Reference to FoodMenu
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  orderDate: { type: Date, default: Date.now }, // Date of the order
});

// Export the FoodOrder model
module.exports = mongoose.model('FoodOrder', FoodOrderSchema);
