const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_secret_key'; // Store securely in an environment variable

// Hash password
exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Compare password
exports.comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT token
exports.generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
};

// Verify JWT token
exports.verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
