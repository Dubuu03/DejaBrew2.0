const User = require('../models/userModel');

// Get all users (Admin Only)
exports.getAllUsers = async (req, res) => {
    try {
        if (req.user.accessLevel !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const users = await User.find().select('-password'); // Exclude password
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving users' });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving user details' });
    }
};

// Edit user profile
exports.editUserProfile = async (req, res) => {
    try {
        const { username, email, profilePicture, accessLevel } = req.body;

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Only an admin can edit access level
        if (req.user.accessLevel !== 'admin' && req.user.id !== req.params.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Update user details
        user.username = username || user.username;
        user.email = email || user.email;
        user.profilePicture = profilePicture || user.profilePicture;
        user.accessLevel = accessLevel || user.accessLevel;

        await user.save();

        return res.status(200).json({ message: 'User profile updated successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating user profile' });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Only admin can delete users
        if (req.user.accessLevel !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        await user.remove();
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting user' });
    }
};
