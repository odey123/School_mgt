const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware').authMiddleware;
const isRevoked = require('../middlewares/authMiddleware').isRevoked;
const userController = require('../controllers/userController');
const router = express.Router();


// POST /: Create a new user
router.post('/', userController.createUser);

// GET /: Get all users (requires auth and admin check)
router.get('/', authMiddleware, isRevoked, userController.getUsers);

// GET /users/:id: Get a user by ID (requires auth and admin check)
router.get('/users/:id', authMiddleware, isRevoked, userController.getUser);

// PATCH /users/:id: Update a user's details by ID (requires auth and admin check)
router.patch('/users/:id', authMiddleware, isRevoked, userController.updateUser);

// PATCH /users/:id/status: Update a user's status by ID (requires auth and admin check)
router.patch('/users/:id/status', authMiddleware, isRevoked, userController.updateUserStatus);

// DELETE /users/:id: Delete a user by ID (requires auth and admin check)
router.delete('/users/:id', authMiddleware, isRevoked, userController.deleteUser);

// POST /users/:id/position: Assign a user to a specific position (requires auth and admin check)
router.post('/users/:id/position', authMiddleware, isRevoked, userController.putUserInPosition);

module.exports = router;