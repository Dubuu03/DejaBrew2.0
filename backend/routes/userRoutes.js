// routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');  // Import the userController

router.get('/users', (req, res) => {
    User.find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((error) => {
            res.status(500).json({ error: 'An error occurred while fetching users.' });
        });
});

router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;
