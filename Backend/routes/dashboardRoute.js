const express = require('express');
const router = express.Router();
const Category = require('../model/categorySchema');
const Product = require('../model/productSchema');
const Sale = require('../model/saleSchema');
const User = require('../model/userSchema');

router.get('/dashboardCounts', async (req, res) => {
  try {
    const [categoryCount, productCount, saleCount, userCount] = await Promise.all([
      Category.countDocuments(),
      Product.countDocuments(),
      Sale.countDocuments(),
      User.countDocuments()
    ]);

    res.status(200).json({
      categoryCount,
      productCount,
      saleCount,
      userCount
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});


module.exports = router