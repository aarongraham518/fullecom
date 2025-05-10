const express = require("express");
const Product = require("../models/product.model");
const Category = require('../models/category.model'); 
const router = express.Router();

// routes/productRoutes.js
router.get('/products/homepage', async (req, res) => {
  try {
    const categories = ['Shoes', 'Bags', 'Shirts', 'Pants'];
    const products = [];

    for (let name of categories) {
      const category = await Category.findOne({ name });

      if (category) {
        const product = await Product.findOne({ category: category._id });
        if (product) products.push(product);
      }
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching homepage products:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get products by category ID
router.get('/products/by-category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({ category: categoryId });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Get a product by id
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get products by category
router.get('/products/category/:categoryName', async (req, res) => {
  try {
    const { categoryName } = req.params;
    const products = await Product.find({ category: categoryName });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new product
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;
    
    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    // Create the new product with the correct category ObjectId
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
    });

    await product.save();  // Save the new product to the database
    res.status(201).json({ product });  // Return the created product as a response

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product" });
  }
});

// Update a product
router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, categoryId, stock, imageUrl } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name,
      description,
      price,
      category,
      categoryId,
      stock,
      imageUrl
    }, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
