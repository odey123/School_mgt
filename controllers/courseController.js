const CourseService = require('../services/courseService');

const courseController = {
    async createCourse(req, res) {
        try {
            const course = await CourseService.createCourse(req.body);
            res.status(201).json(course);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getCourses(req, res) {
        try {
            const courses = await CourseService.getCourses();
            res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getCourseById(req, res) {
        try {
            const course = await CourseService.getCourseById(req.params.id);
            res.status(200).json(course);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    async updateCourse(req, res) {
        try {
            const courseId = req.params.id;
            const updatedCourse = await courseService.updateCourse(courseId, req.body);
            if (!updatedCourse) {
                return res.status(404).json({ message: 'Course not found' });
            }
            res.status(200).json(updatedCourse);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateCourseStatus(req, res) {
        try {
            const course = await CourseService.updateCourseStatus(req.params.id, req.body.status);
            res.status(200).json(course);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
};

module.exports = courseController;
