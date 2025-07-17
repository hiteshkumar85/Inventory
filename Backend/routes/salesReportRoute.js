const express = require('express');
const router = express.Router();
const Sale = require('../model/saleSchema');

// get the sales report by a date 
router.post('/dailySales', async (req, res) => {
    const { date } = req.body;
    try {
        const sales = await Sale.find({ date });
        if (sales) {
            res.status(200).json(sales);
        } else {
            res.status(500).json({
                message: "sales not found at this date"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

// get the sales report that are added last day 
router.get('/lastDaySales', async (req, res) => {
    try {
        const lastSale = await Sale.findOne().sort({ date: -1 });
        const sales = await Sale.find({ date: lastSale.date })
        res.json(sales);
    } catch (err) {
        console.log(err);
    }
});

// get the monthly sales report  
router.post('/monthlySales', async (req, res) => {
    const { month, year } = req.body;
    try {
        const sales = await Sale.find({
            date: {
                $regex: `^${year}-${month}-[0-9]`
            }
        });
        res.json(sales);
    } catch (err) {
        console.log(err);
    }
});

// get the last month sales report 
router.get('/lastMonthSales', async (req, res) => {
    try {
        const lastSale = await Sale.findOne().sort({ date: -1 });
        const [year, month] = lastSale.date.split('-');
        const sales = await Sale.find({
            date: {
                $regex: `^${year}-${month}`
            }
        });
        res.json(sales);
    } catch (err) {
        console.log(err);
    }
});

// get the sales report by date range 
router.post('/reportByDateRange', async (req, res) => {
    const { startDate, lastDate, category, product } = req.body;
    try {
        const filter = {
            date: {
                $gte: startDate,
                $lte: lastDate
            }
        };

        if (category !== 'All categories') {
            filter.category = category
        };

        if (product !== 'All products') {
            filter.name = product
        };

        const sales = await Sale.find(filter);
        res.json(sales);
    } catch (err) {
        console.log(err);
    }
});


module.exports = router;