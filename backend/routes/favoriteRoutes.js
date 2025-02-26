const express = require('express');
const router = express.Router();
const { toggleFavorite, getFavorites } = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/authMiddleware');  // Import the auth middleware

// Route to toggle product favorite with authentication
router.post('/toggle', authMiddleware.verifySession, toggleFavorite);

// Route to get favorites with authentication
router.get('/', authMiddleware.verifySession, getFavorites);

module.exports = router;
