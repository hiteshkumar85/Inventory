const express = require('express');
const router = express.Router();
const Sale = require('../model/saleSchema');
const Product = require('../model/productSchema');

// fetch all sales from the database
router.get('/sale', async (req, res) => {
    try {
        const sale = await Sale.find();
        res.status(200).json(sale);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// save a new sale in database 
router.post('/sale', async (req, res) => {
    try {
        const { name, category, quantity, date } = req.body;
        if (!name.trim() || !category.trim()) {
            return res.status(400).json("Sale name and category is required!");
        }
        const isExist = await Sale.findOne({name, category, date});
        if(isExist) {
            return res.status(409).json("Sale already exists!");
        }
        const newSale = new Sale({ name, category, quantity, date });
        await newSale.save();

        const product = await Product.findOne({ title: name, category: category });
        if (product) {
            if (product.quantity >= quantity) {
                product.quantity -= quantity;
                await product.save();
            }
        }

        res.status(200).json("new sale is added successfully");
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
});

// update the sale in database
router.put('/sale/:id', async (req, res) => {
    const { id } = req.params;
    const { name, category, quantity, date } = req.body;
    try {
        if (!name.trim() || !category.trim()) {
            return res.status(400).json("Sale name and category is required!");
        }
        const isExist = await Sale.findOne({name, category, date});
        if(isExist) {
            return res.status(409).json("Sale already exists!");
        }
        const sale = await Sale.findOne({ name: name, category: category });
        const product = await Product.findOne({ title: name, category: category });
        if (product) {
            if (sale) {
                if (sale.quantity > quantity) {
                    product.quantity += (sale.quantity - quantity);
                    await product.save();
                } else if (sale.quantity < quantity) {
                    product.quantity -= (quantity - sale.quantity);
                    await product.save();
                }

                const isUpdate = await Sale.findByIdAndUpdate(id, { name, category, quantity, date });
                if (!isUpdate) {
                    res.json("sale not found.")
                } else {
                    res.status(200).json("sale is updated successfully.")
                }
            }

        }

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

// delete the sale in database 
router.delete('/sale/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sale = await Sale.findById(id);
        const product = await Product.findOne({ title: sale.name, category: sale.category });
        if (sale) {
            if (product) {
                product.quantity = parseInt(product.quantity) + parseInt(sale.quantity);
                await product.save();
                const isdeletedSale = await Sale.findByIdAndDelete(id);
                if (isdeletedSale) {
                    res.status(200).json("sale is deleted successfully")
                } else {
                    res.json("sale not found")
                }
            }
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// get the sale from the database by id 
router.get('/sale/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sale = await Sale.findById(id);
        res.status(200).json(sale);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;