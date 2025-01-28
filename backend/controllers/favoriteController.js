const toggleFavorite = (req, res) => {
    const { productId } = req.body;

    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    // Initialize user's favorites if not already
    if (!req.session.user.favorites) {
        req.session.user.favorites = [];
    }

    const favorites = req.session.user.favorites;

    // Check if the product is already in favorites
    const index = favorites.indexOf(productId);

    if (index !== -1) {
        // If the product is already a favorite, remove it
        favorites.splice(index, 1);
    } else {
        // If the product is not a favorite, add it
        favorites.push(productId);
    }

    // Save updated favorites to session
    req.session.user.favorites = favorites;

    res.status(200).json({ message: 'Favorite status updated', favorites: req.session.user.favorites });
};

// Get the user's favorites
const getFavorites = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    // Send the user's favorites list
    const favorites = req.session.user.favorites || [];
    res.status(200).json({ favorites });
};

module.exports = { toggleFavorite, getFavorites };
