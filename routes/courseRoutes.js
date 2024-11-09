const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authMiddleware, isRevoked } = require('../middlewares/authMiddleware');  // Import middleware

// Create a course (Admin only)
router.post('/registercourse', authMiddleware, isRevoked,  courseController.createCourse);

// Get all courses
router.get('/', authMiddleware, courseController.getCourses);

// Get a single course by ID
router.get('/:id', authMiddleware, courseController.getCourseById);

// Update a course by ID (Admin only)
router.patch('/:id', authMiddleware, isRevoked, courseController.updateCourse);

// Update course status by ID (Admin only)
router.patch('/:id/status', authMiddleware, isRevoked, courseController.updateCourseStatus);

module.exports = router;
