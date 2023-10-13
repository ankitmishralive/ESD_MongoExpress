const mongoose = require("mongoose");

const laptopSchema = new mongoose.Schema({
    laptopBrand: String,
    laptopName: String,
    laptopPrice: Number,
    laptopDisplay: String,
    laptopProcessor: String,
    laptopRAM: String,
    laptopStorage: String,
});

module.exports = mongoose.model('laptopModel', laptopSchema);
