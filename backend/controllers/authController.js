// userController.js
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const userExistsByEmail = (email) => {
    const sanitizedEmail = email.toLowerCase().trim();
    return User.findOne({ email: sanitizedEmail })
        .then((user) => !!user)
        .catch((err) => {
            console.error('Error checking email existence:', err);
            throw new Error('Error checking email existence');
        });
};

const userExistsByUsername = (username) => {
    const sanitizedUsername = username.trim();
    return User.findOne({ username: sanitizedUsername })
        .then((user) => !!user)
        .catch((err) => {
            console.error('Error checking username existence:', err);
            throw new Error('Error checking username existence');
        });
};

// Signup function
const signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if email already exists
        const emailExists = await userExistsByEmail(email);
        if (emailExists) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // Check if username already exists
        const usernameExists = await userExistsByUsername(username);
        if (usernameExists) {
            return res.status(402).json({ message: 'Username already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);  // Hashing with salt rounds

        // Create new user with hashed password
        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error checking email or username existence or saving user:', error);
        res.status(500).json({ error: 'An error occurred while creating a new user.' });
    }
};

// Login function
const login = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                // Email does not exist
                return res.status(404).json({ message: 'Email not found.' });
            }

            // Compare the provided password with the stored hashed password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).json({ message: 'An error occurred during login.' });
                }

                if (!isMatch) {
                    // Password does not match
                    return res.status(401).json({ message: 'Incorrect password.' });
                }

                res.status(200).json({ message: 'Login successful', user });
            });
        })
        .catch((error) => {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'An error occurred during login.' });
        });
};


module.exports = { signup, login, };
