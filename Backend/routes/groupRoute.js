const express = require('express');
const router = express.Router();
const Group = require('../model/groupSchema');

// fetch all the groups from the database 
router.get('/group', async (req, res) => {
    try {
        const group = await Group.find();
        res.json(group);
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// save new group in the database 
router.post('/group', async (req, res) => {
    const { name, level, status } = req.body;
    try {

        if (!name?.trim()) {
            return res.status(400).json("Group name is required.");
        }

        const isExist = await Group.findOne({ name });
        if (isExist) {
            return res.status(409).json("Group name already exist!");
        }

        const newGroup = new Group({ name, level, status });
        await newGroup.save();
        res.json(newGroup);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// delete the group from the database 
router.delete('/group/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const isdelete = await Group.findByIdAndDelete(id);
        if (isdelete) {
            res.status(200).json("group deleted successfully.")
        } else {
            res.status(500).json("group is not found.")
        }
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
})

// update the group in the database
router.put('/group/:id', async (req, res) => {
    const { id } = req.params;
    const { name, level, status } = req.body;
    try {

        if (!name?.trim()) {
            return res.status(400).json("Group name is required.");
        }

        const isExist = await Group.findOne({ name });
        if (isExist) {
            return res.status(409).json("Group name already exist!");
        }

        const isUpdate = await Group.findByIdAndUpdate(id, { name, level, status });
        if (isUpdate) {
            res.status(200).json("group updated successfully.")
        } else {
            res.status(500).json("group not found.")
        }
    } catch (err) {
        res.json({
            message: err.message
        })
    }
});

// fetch a group from the database by the id
router.get('/group/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const group = await Group.findById(id);
        res.json(group);
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

module.exports = router;