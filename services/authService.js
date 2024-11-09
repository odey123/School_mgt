const bcrypt = require('bcrypt');
const User = require('../models/User'); 
const jwt = require('jsonwebtoken'); 


const hashPassword = async (password) => await bcrypt.hash(password, 10);


const comparePassword = async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword);


const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user._id, 
            email: user.email, 
            isAdmin: user.isAdmin 
        }, 
        'your_jwt_secret_key', 
        { expiresIn: '2d' } 
    );
};

const AuthService = {
    
    async register(data) {
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) throw new Error('User with this email already exists.');

        data.password = await hashPassword(data.password);
        const newUser = new User(data);
        return await newUser.save();
    },

    // Login user and return token
    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid credentials');

        const token = generateToken(user);
        return { token, message: 'Login successful' };
    },

    // Change user password
    async changePassword(userId, newPassword) {
        const hashedPassword = await hashPassword(newPassword);
        const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
        
        if (!updatedUser) throw new Error('User not found');
        
        return updatedUser;
    },

    // Create a new user
    async createUser(data) {
        if (data.password) {
            data.password = await hashPassword(data.password);
        }
        const newUser = new User(data);
        return await newUser.save();
    },

    // Get user by ID
    async getUserById(id) {
        const user = await User.findById(id);
        if (!user) throw new Error('User not found');
        return user;
    }
};

module.exports = AuthService;
