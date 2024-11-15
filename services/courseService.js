// services/courseService.js

const Course = require('../models/course'); // Import the Course model
const { Status } = require('../enums'); // Assuming Status enum is in enums.js

const CourseService = {
    // Create a course (only accessible by admin)
    async createCourse(data) {
        const newCourse = new Course(data);
        return await newCourse.save();
    },

    // Get all courses
    async getCourses() {
        return await Course.find(); // You can apply filters if needed
    },

    // Get a single course by ID
    async getCourseById(id) {
        return await Course.findById(id); // Find by ID and return the course
    },

    // Update course details by ID
    async updateCourse(id, data) {
        return await Course.findByIdAndUpdate(id, data, { new: true }); // Update and return the updated course
    },

    // Update course status by ID
    async updateCourseStatus(id, status) {
        if (!Status.includes(status)) {
            throw new Error('Invalid status');
        }
        return await Course.findByIdAndUpdate(id, { status }, { new: true }); // Update and return updated course
    }
};

module.exports = CourseService;
