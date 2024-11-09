const User = require('../models/User');
const bcrypt = require('bcrypt');
const Position = require('../models/Position');
const { hashPassword, comparePassword, generateToken } = require('../utils/auth');

const UserService = {
    async register(data) {
        data.password = await hashPassword(data.password);
        const newUser = new User(data);
        return await newUser.save();
    },

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid credentials');

        return generateToken(user);
    },

    async changePassword(userId, newPassword) {
        const hashedPassword = await hashPassword(newPassword);
        return await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
    },

    async createUser(data) {
        // Hash the password before saving the user
        if (data.password) {
            data.password = await hashPassword(data.password);  // Hash the password
        }
    
        const newUser = new User(data);
        return await newUser.save();  // Save the new user to the database
    },

    async getUserById(id) {
        return await User.findById(id);
    },

    async getAllUsers() {
        return await User.find();
    },

    async updateUser(id, data) {
        return await User.findByIdAndUpdate(id, data, { new: true });
    },

    async updateUserStatus(id, status) {
        return await User.findByIdAndUpdate(id, { status }, { new: true });
    },

    async deleteUser(id) {
        await User.findByIdAndDelete(id);
    },

    async putUserInPosition(userId, positionData) {
        const position = new Position({ user: userId, ...positionData });
        return await position.save();
    }
};

module.exports = UserService;
