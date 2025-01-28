const Product = require('../models/productModel'); // Adjust the path as needed

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { productName, type, price, description, image, detailsImage, quantity } = req.body;

        const product = new Product({
            productName,
            type,
            price,
            description,
            image,
            detailsImage,
            quantity: quantity || 0
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
    const { productName, type, price, description, image, detailsImage, quantity } = req.body;

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
        product.quantity = quantity || product.quantity;


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

// Update stock for a product
exports.updateStock = async (req, res) => {
    try {
        const { quantity } = req.body;
        const { productId } = req.params;  // Retrieve productId from params

        if (!productId || quantity === undefined) {
            return res.status(400).json({ message: 'Product ID and quantity are required' });
        }

        // Find the product by productId
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update stock quantity
        product.quantity = quantity;
        await product.save();

        // Return updated product information (stock quantity)
        return res.status(200).json({
            message: 'Stock updated successfully',
            productId: product._id,
            updatedQuantity: product.quantity
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating stock' });
    }
};

// Get current stock for a product
exports.getStock = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ stock: product.quantity });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving stock' });
    }
};