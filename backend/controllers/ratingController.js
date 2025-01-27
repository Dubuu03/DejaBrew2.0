const Product = require('../models/productModel'); // Adjust the path as needed

// Add a rating to a product
exports.addRating = async (req, res) => {
    const { productId } = req.params;
    const { userID, rating } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Add the rating to the product
        product.ratings.push({ userID, rating });
        await product.save();

        res.status(201).json({
            message: 'Rating added successfully!',
            product
        });
    } catch (err) {
        res.status(500).json({ message: 'Error adding rating', error: err.message });
    }
};

// Get all ratings for a product
exports.getRatingsForProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product.ratings);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching ratings', error: err.message });
    }
};

// Update a rating for a product
exports.updateRating = async (req, res) => {
    const { productId, ratingId } = req.params;
    const { rating } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the rating to update
        const ratingToUpdate = product.ratings.id(ratingId);
        if (!ratingToUpdate) {
            return res.status(404).json({ message: 'Rating not found' });
        }

        // Update the rating
        ratingToUpdate.rating = rating;
        await product.save();

        res.status(200).json({
            message: 'Rating updated successfully!',
            product
        });
    } catch (err) {
        res.status(500).json({ message: 'Error updating rating', error: err.message });
    }
};

// Delete a rating for a product
exports.deleteRating = async (req, res) => {
    const { productId, ratingId } = req.params;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the rating to delete
        const ratingToDelete = product.ratings.id(ratingId);
        if (!ratingToDelete) {
            return res.status(404).json({ message: 'Rating not found' });
        }

        // Delete the rating
        ratingToDelete.remove();
        await product.save();

        res.status(200).json({
            message: 'Rating deleted successfully!',
            product
        });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting rating', error: err.message });
    }
};
