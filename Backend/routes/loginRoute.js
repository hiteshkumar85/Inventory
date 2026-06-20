const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid user details' });
        }
        user.lastLogin = new Date();
        await user.save();
        const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, process.env.SECRETKEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.json({ message: err.message });
    }
});

router.post('/saveAdmin', async (req, res) => {
    try {
        const userCount = await User.countDocuments({});
        if (userCount === 0) {
            const name = process.env.USERNAME;
            const hashedPassword = await bcrypt.hash(process.env.USERPASSWORD, 10);
            const user = new User({ addedBy: "Owner", name, password: hashedPassword, role: "Admin", status: "Active" });
            await user.save();
            return res.json(user);
        } else {
            return res.json({ message: "Admin already exists" });
        }
    } catch (err) {
        return res.json({ message: err.message });
    }
});

module.exports = router;