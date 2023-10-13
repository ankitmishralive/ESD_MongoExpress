// routes.js
const express = require('express');
const router = express.Router();

// Define a route for the home page
router.get('/', (req, res) => {
    // res.send('Welcome to the home page!');
    res.render('home');
});

module.exports = router;
