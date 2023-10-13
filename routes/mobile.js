const express = require("express");
const router = express.Router();
const mobileModel = require('../models/mobile_model');

router.get('/', async (req, res) => {
    try {
        const mobiles = await mobileModel.find();
        res.render('mobiles', { mobiles: mobiles });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const mobiles = await mobileModel.findById(req.params.id);
        res.json(mobiles);
    } catch (err) {
        res.send(err);
    }
});

router.post('/', async (req, res) => {
    const mobile = new mobileModel({
        mobileBrand: req.body.mobileBrand,
        mobileName: req.body.mobileName,
        mobilePrice: req.body.mobilePrice,
        mobileDisplay: req.body.mobileDisplay,
        mobileCamera: req.body.mobileCamera,
        mobileBattery: req.body.mobileBattery
    });

    try {
        const m1 = await mobile.save();
        res.json(m1);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while saving the mobile data.' });
    }
});

router.get('/find-by-brand/:name', async (req, res) => {
    const name = req.params.name;

    try {
        const mobile = await mobileModel.findOne({ mobileBrand: name });

        if (!mobile) {
            return res.status(404).json({ message: 'Mobile not found' });
        }

        res.json(mobile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const mobile = await mobileModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!mobile) {
            return res.status(404).json({ message: 'Mobile not found' });
        }

        res.json(mobile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete-by-name/:name', async (req, res) => {
    const name = req.params.name;

    try {
        const deletedMobile = await mobileModel.findOneAndDelete({ mobileName: name });

        if (!deletedMobile) {
            return res.status(404).json({ message: 'Mobile not found' });
        }

        res.json({ message: 'Mobile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




module.exports = router;
