// expense.js
const mongoose = require('mongoose');
const { ExpenseStatus } = require('./enums');

const ExpenseSchema = new mongoose.Schema({
  idNumber: String,
  amount: Number,
  title: String,
  description: String,
  status: { type: String, enum: ExpenseStatus, default: 'pending' }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
