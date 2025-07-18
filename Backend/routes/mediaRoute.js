const express = require('express');
const router = express.Router();
const Photo = require('../model/mediaSchema');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: 'uploadedImage/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

// view all stored photos 
router.get('/photo', async (req, res) => {
    try {
        const photo = await Photo.find();
        res.status(200).json(photo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// add new photo in database
router.post('/photo', upload.single('image'), async (req, res) => {
    try {
        const imageName = req.file.filename;
        const newPhoto = new Photo({ imageName });
        await newPhoto.save();
        res.status(200).json("new photo added successfully.")
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})

// remove photo from database
router.delete('/photo/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // delete image from the react folder 
        const image = await Photo.findOne({ "_id": id });
        const imagePath = path.join(__dirname, `uploadedImage\\${image.imageName}`);
        fs.unlink(imagePath, (err, data)=>{
            console.log(err);
        });

        // delete image from the database 
        const deletedPhoto = await Photo.findByIdAndDelete(id);
        if (!deletedPhoto) {
            res.json("photo not found.")
        } else {
            res.status(200).json("photo is deleted successfully.")
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