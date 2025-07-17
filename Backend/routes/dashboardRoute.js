const express = require('express');
const router = express.Router();
const Category = require('../model/categorySchema');
const Product = require('../model/productSchema');
const Sale = require('../model/saleSchema');
const User = require('../model/userSchema');
// get the category count 
router.get('/categoryCount', async (req, res) => {
    try {
        const count = await Category.countDocuments({});
        res.status(200).json(count);
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
});

// get the product count
router.get('/productCount', async (req, res) => {
    try {
        const count = await Product.countDocuments({});
        res.status(200).json(count);
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
});

// get the seles count 
router.get('/saleCount', async (req, res) => {
    try {
        const count = await Sale.countDocuments({});
        res.status(200).json(count);
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
});

// get the users count 
router.get('/userCount', async (req, res) => {
    try {
        const count = await User.countDocuments({});
        res.status(200).json(count);
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})

module.exports = router