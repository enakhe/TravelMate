const express = require('express');
const router = express.Router();
const Place = require('../models/Place');
const Category = require('../models/Category');
const { ensureAuthenticated } = require('../config/auth');

router.get('/', async (req, res) => {
    const places = await Place.find().exec();
    res.render('index', { layout: 'layout' , user: req.user, places: places });
})

router.get('/flights', async (req, res) => {
    const places = await Place.find(
        {
            categoryName: 'Flight'
        }
    ).exec();
    res.render('flights', { layout: 'layout', user: req.user, places: places } );
})

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    const places = await Place.find().exec();
    const categories = await Category.find().exec();
    res.render('dashboard', { layout: 'layout-admin', user: req.user, places: places, categories: categories});
})

module.exports = router;