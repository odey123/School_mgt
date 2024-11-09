// controllers/authController.js
const AuthService = require('../services/authService');

const register = async (req, res) => {
    try {
        const user = await AuthService.register(req.body);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, message } = await AuthService.login(email, password);
        res.json({ message, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const changePassword = async (req, res) => {
    try {
        const { userId, newPassword } = req.body;
        const updatedUser = await AuthService.changePassword(userId, newPassword);
        res.json({ message: 'Password updated successfully', updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { register, login, changePassword };
