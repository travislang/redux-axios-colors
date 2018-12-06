const express = require('express');
const router = express.Router();
let colors = [{ name: 'Red', count: 2 }, { name: 'Yellow', count: 4 }];

// Get all the colors
router.get('/', (req, res) => {
    res.send(colors);
});

// Add a new color object
router.post('/', (req, res) => {
    console.log(req.body);
    colors.push(req.body);
    res.sendStatus(201);
});

router.delete('/', (req, res) => {
    colors = [];
    res.sendStatus( 200 );
})

module.exports = router;