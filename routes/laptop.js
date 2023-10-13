const express = require("express");
const router = express.Router();
const laptopModel = require('../models/laptop_model');

router.get('/', async (req, res) => {
    try {
        const laptops = await laptopModel.find();
        res.render('laptops', { laptops: laptops });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const laptop = await laptopModel.findById(req.params.id);
        res.json(laptop);
    } catch (err) {
        res.send(err);
    }
});

router.post('/', async (req, res) => {
    const laptop = new laptopModel({
        laptopBrand: req.body.laptopBrand,
        laptopName: req.body.laptopName,
        laptopPrice: req.body.laptopPrice,
        laptopDisplay: req.body.laptopDisplay,
        laptopProcessor: req.body.laptopProcessor,
        laptopRAM: req.body.laptopRAM,
        laptopStorage: req.body.laptopStorage
    });

    try {
        const l1 = await laptop.save();
        res.json(l1);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while saving the laptop data.' });
    }
});

router.get('/find-by-brand/:name', async (req, res) => {
    const name = req.params.name;

    try {
        const laptop = await laptopModel.findOne({ laptopBrand: name });

        if (!laptop) {
            return res.status(404).json({ message: 'Laptop not found' });
        }

        res.json(laptop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const laptop = await laptopModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (!laptop) {
            return res.status(404).json({ message: 'Laptop not found' });
        }

        res.json(laptop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete-by-name/:name', async (req, res) => {
    const name = req.params.name;

    try {
        const deletedLaptop = await laptopModel.findOneAndDelete({ laptopName: name });

        if (!deletedLaptop) {
            return res.status(404).json({ message: 'Laptop not found' });
        }

        res.json({ message: 'Laptop deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
