const express = require('express');
const Product = require('../model/productSchema');
const Sale = require('../model/saleSchema');
const router = express.Router();

// save the product in the database 
router.post('/product', async (req, res) => {
    try {
        const { title, category, photo, quantity, buyingPrice, sellingPrice } = req.body;

        if (!title.trim() || !category.trim()) {
            return res.status(400).json("Product title and category is required!");
        }

        const isExist = await Product.findOne({ title, category });
        if (isExist) {
            return res.status(409).json("Product already exists!");
        }

        const newProduct = new Product({ title, category, photo, quantity, buyingPrice, sellingPrice });
        await newProduct.save();
        res.status(200).json("new product is added successfully");
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
});

// fetch the all products from the database
router.get('/product', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products)
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// delete the product in the database by product id
router.delete('/product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (product) {
            const sales = await Sale.find({ name: product.title, category: product.category });
            if (sales) {
                await Sale.deleteMany({ name: product.title, category: product.category });
            }
            await Product.deleteOne(product);
            res.status(200).json("product is deleted successfully")
        } else {
            res.json("product is not found")
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// edit the product in the database by product id 
router.put('/product/:id', async (req, res) => {
    const { id } = req.params;
    const { title, category, photo, quantity, buyingPrice, sellingPrice } = req.body;
    try {

        if (!title.trim() || !category.trim()) {
            return res.status(400).json("Product title and category is required!");
        }

        const isExist = await Product.findOne({ title, category });
        if (isExist) {
            return res.status(409).json("Product already exists!");
        }

        const isUpdate = await Product.findByIdAndUpdate(id, { title, category, photo, quantity, buyingPrice, sellingPrice });
        if (!isUpdate) {
            res.json("Product is not found.")
        } else {
            res.status(200).json("product is updated successfully.")
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

// get the product from database by id 
router.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;