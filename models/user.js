// user.js
const mongoose = require('mongoose');
const { Status } = require('../enums');

const EducationSchema = new mongoose.Schema({
  university: String,
  degree: String,
  startDate: String,
  endDate: String,
  city: String
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: String,
  idNumber: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isStudent: { type: Boolean, required: true },
  firstName: String,
  lastName: String,
  photo: String,
  dateOfBirth: String,
  placeOfBirth: String,
  education: EducationSchema,
  status: { type: String, enum: Status, default: 'normal' },
  parentFirstName: String,
  parentLastName: String,
  parentEmail: String,
  parentAddress: String,
  parentPhone: String,
  address: String,
  about: String,
  expertise: String
});

const User = mongoose.models.user || mongoose.model('user', UserSchema);

module.exports = User;