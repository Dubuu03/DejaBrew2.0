const authMiddleware = {
    // Verify if the user is logged in
    verifySession: (req, res, next) => {
        if (!req.session || !req.session.user) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }
        req.user = req.session.user;  // Attach the user data to the request object
        next();
    },

    // Check if the user is an admin
    isAdmin: (req, res, next) => {
        if (req.user.accessLevel !== 'admin') {
            return res.status(403).json({ message: 'Forbidden. Admin access required.' });
        }
        next();
    },

    // Check if the user is trying to edit their own profile or is an admin
    isSelfOrAdmin: (req, res, next) => {
        const userId = req.params.id;
        if (req.user.accessLevel === 'admin' || req.user.id === userId) {
            return next();
        }
        return res.status(403).json({ message: 'Forbidden. You can only edit your own profile or be an admin.' });
    }
};

module.exports = authMiddleware;
