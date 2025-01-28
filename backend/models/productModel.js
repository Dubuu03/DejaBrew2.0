const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
});

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Hot Coffee', 'Cold Drink', 'Non-Coffee', 'Pastry']
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    detailsImage: {
        type: String,
        required: false
    },
    ratings: [ratingSchema],
    quantity: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
