const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all users (Admin Only)
router.get('/', authMiddleware.verifySession, authMiddleware.isAdmin, userController.getAllUsers);

// Get a user by ID
router.get('/:id', authMiddleware.verifySession, userController.getUserById);

// Edit a user's profile (Admin can edit any user, user can edit their own)
router.put('/:id', authMiddleware.verifySession, authMiddleware.isSelfOrAdmin, userController.editUserProfile);

// Delete a user (Admin only)
router.delete('/:id', authMiddleware.verifySession, authMiddleware.isAdmin, userController.deleteUser);

module.exports = router;
