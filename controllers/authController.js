// controllers/authController.js
const authService = require('../services/authService');

const authController = {
    async register(req, res) {
        try {
            const user = await authService.register(req.body);
            res.status(201).json({ message: 'User created successfully', user });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { token, message } = await authService.login(email, password);
            res.json({ message, token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async changePassword(req, res) {
        try {
            const { userId, newPassword } = req.body;
            const updatedUser = await authService.changePassword(userId, newPassword);
            res.json({ message: 'Password updated successfully', updatedUser });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = authController;
