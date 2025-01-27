const Product = require('../models/productModel'); // Adjust the path as needed

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { productName, type, price, description, image, detailsImage } = req.body;

        const product = new Product({
            productName,
            type,
            price,
            description,
            image,
            detailsImage, 
        });
        await product.save();

        res.status(201).json({
            message: 'Product created successfully!',
            product
        });
    } catch (err) {
        res.status(500).json({ message: 'Error creating product', error: err.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
};

// Get products by type
exports.getProductsByType = async (req, res) => {
    const { type } = req.params;

    try {
        const products = await Product.find({ type });
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this type' });
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products by type', error: err.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product', error: err.message });
    }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { productName, type, price, description, image, detailsImage } = req.body;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update product details
        product.productName = productName || product.productName;
        product.type = type || product.type;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image; 
        product.detailsImage = detailsImage || product.detailsImage; 

        // Save updated product
        await product.save();

        res.status(200).json({
            message: 'Product updated successfully!',
            product
        });
    } catch (err) {
        res.status(500).json({ message: 'Error updating product', error: err.message });
    }
};

// Delete product by ID
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete the product
        await product.deleteOne();

        res.status(200).json({
            message: 'Product deleted successfully!',
        });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
};


