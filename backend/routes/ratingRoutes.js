const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

// Rating routes
router.post('/products/:productId/rating', ratingController.addRating);
router.get('/products/rating/:productId', ratingController.getRatingsForProduct);
router.put('/products/rating/:ratingId', ratingController.updateRating);
router.delete('/products/rating/:ratingId', ratingController.deleteRating);

module.exports = router;
