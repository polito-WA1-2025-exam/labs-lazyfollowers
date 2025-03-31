// routes related to assets (ingredients, recipes, etc.)
const express = require('express');

const router = express.Router();

router.get('/ingredients', (req, res) => {
    res.json({ message: 'List of ingredients' });
})

router.get('/recipes', (req, res) => {
    res.json({ message: 'List of ingredients' });
})
