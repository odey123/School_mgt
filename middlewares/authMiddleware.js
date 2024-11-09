const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.secret;

exports.authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Check if the user is an admin and revoke the token if not
exports.isRevoked = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        console.log('User is not an admin');
        return res.status(403).json({ message: 'Access denied. User is not an admin.' });
    }
    console.log('User is an admin');
    next(); // Proceed if the user is an admin
};
