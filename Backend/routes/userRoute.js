const express = require('express');
const router = express.Router();
const User = require('../model/userSchema');
const bcrypt = require('bcryptjs');
const path = require('path');
const multer = require('multer');
const fs = require('fs');


router.post('/user', async (req, res) => {
    const { name, password, role, status } = req.body;
    const loginPerson = req.user;
    const addedBy = loginPerson.name;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (loginPerson.role == 'Admin') {
        try {
            if (!name.trim() || !password.trim()) {
                return res.status(400).json("Username and password required!");
            }
            const userExist = await User.findOne({ name });
            if (userExist) {
                return res.status(409).json({ message: "User name already exists" });
            }
            const user = new User({ addedBy, name, password: hashedPassword, role, status });
            await user.save();
            res.json(user);

        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            })
        }

    }
});

router.get('/user', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

router.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (user.image) {
            const imagePath = path.join(__dirname, `profileImage\\${user.image}`);
            fs.unlink(imagePath, (err, data) => {
                console.log(err);
            });
        }
        const isdelete = await User.findByIdAndDelete(id);
        if (isdelete) {
            res.status(200).json("User deleted successfully.")
        } else {
            res.status(500).json("User is not found.")
        }
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
});

router.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const loginPerson = req.user;
    const addedBy = loginPerson.name;
    const { name, role, status } = req.body;

    try {
        if (!name.trim()) {
            return res.status(400).json("User name is required!");
        }
        const userExist = await User.findOne({ name });
        if (userExist) {
            return res.status(409).json({ message: "User name already exists" });
        }

        const isUpdate = await User.findByIdAndUpdate(id, { addedBy, name, role, status });
        if (isUpdate) {
            res.status(200).json("User updated successfully.")
        } else {
            res.status(500).json("User not found.")
        }
    } catch (err) {
        res.json({
            message: err.message
        })
    }
});

router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.json(user);
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

const storage = multer.diskStorage({
    destination: 'profileImage/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/changeUserImage', upload.single('image'), async (req, res) => {
    try {
        const image = req.file.filename;
        const userName = req.user.name;
        let user = await User.findOne({ name: userName });

        if (user.image) {
            const imagePath = path.join(__dirname, `profileImage\\${user.image}`);
            fs.unlink(imagePath, (err, data) => {
                console.log(err);
            });
        }
        user.image = image;
        await user.save();
        res.status(200).json("profile photo added successfully.")
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
});

router.get('/profile', async (req, res) => {
    try {
        const name = req.user.name;
        const user = await User.findOne({ name: name });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.put('/changeUserName', async (req, res) => {
    try {
        const name = req.user.name;
        const { newName } = req.body;
        const user = await User.findOne({ name: name });
        if (user) {
            user.name = newName;
            await user.save();
            res.json(user);
        }
    } catch (err) {
        res.json(err);
    }
});

router.put('/changeUserPassword', async (req, res) => {
    try {
        const name = req.user.name;
        const { newPassword } = req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await User.findOne({ name: name });
        if (user) {
            user.password = hashedPassword;
            await user.save();
            res.json(user);
        }
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;