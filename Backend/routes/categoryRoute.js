const express = require('express');
const router = express.Router();
const Category = require('../model/categorySchema');

// view all categories form the database 

router.get('/category', async (req, res) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
});

// add new category in database 

router.post('/category', async (req, res) => {
    try {
        const { category } = req.body;
        if (!category?.trim()) {
            return res.status(400).json("Category is required.");
        }

        const isExist = await Category.findOne({ category });
        if (isExist) {
            return res.status(409).json("category already exist!");
        }

        const newCategory = new Category({ category });
        await newCategory.save();
        res.status(200).json("new category added.")
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
});

// update the category in database 

router.put('/category/:id', async (req, res) => {
    const { id } = req.params;
    const { category } = req.body;
    try {
        if (!category?.trim()) {
            return res.status(400).json("Category is required.");
        }

        const isExist = await Category.findOne({ category });
        if (isExist) {
            return res.status(409).json("category already exist!");
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, { category });
        if (!updatedCategory) {
            res.json("category not found.")
        } else {
            res.status(200).json("category is updated successfully.")
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
});

// delete the category from database 

router.delete('/category/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            res.json("category not found.")
        } else {
            res.status(200).json("category is deleted successfully.")
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
});

module.exports = router;
