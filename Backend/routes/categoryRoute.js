const express = require('express');
const router = express.Router();
const Category = require('../model/categorySchema');

//  Get all categories
router.get('/category', async (req, res) => {
    try {
        const category = await Category.find();
        return res.status(200).json(category);
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

//  Add a new category
router.post('/category', async (req, res) => {
    try {
        const { category } = req.body;
        if (!category?.trim()) {
            return res.status(400).json("Category is required.");
        }

        const isExist = await Category.findOne({ category });
        if (isExist) {
            return res.status(409).json("Category already exists!");
        }

        const newCategory = new Category({ category });
        await newCategory.save();
        return res.status(201).json("New category added.");
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

//  Update category
router.put('/category/:id', async (req, res) => {
    const { id } = req.params;
    const { category } = req.body;
    try {
        if (!category?.trim()) {
            return res.status(400).json("Category is required.");
        }

        const isExist = await Category.findOne({ category });
        if (isExist) {
            return res.status(409).json("Category already exists!");
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, { category }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json("Category not found.");
        }

        return res.status(200).json("Category updated successfully.");
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

//  Delete category
router.delete('/category/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json("Category not found.");
        }

        return res.status(200).json("Category deleted successfully.");
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
