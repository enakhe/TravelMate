const express = require('express');
const { ensureAuthenticated } = require('../config/auth');
const Place = require('../models/Place');
const Category = require('../models/Category');

const router = express.Router();

router.get('/places', ensureAuthenticated, async (req, res) => {
    const places = await Place.find().exec();
    console.log(places);
    const categories = await Category.find().exec();
    res.render('places', { layout: 'layout-admin', user: req.user, places: places, categories: categories });
});

router.get('/category', ensureAuthenticated, async (req, res) => {
    const cateories = await Category.find().exec();
    res.render('category', { layout: 'layout-admin', user: req.user, cateories: cateories });
});

router.post('/places', ensureAuthenticated, async (req, res) => {
    const places = await Place.find().exec();
    const categories = await Category.find().exec();
    const { name, location, description, image, price, category } = req.body;
    const errors = [];

    if (!name || !location || !description || !image || !price || category === 0) {
        errors.push({ msg: 'Please input all fields' });
    }

    if (errors.length > 0) {
        res.render('places', {
            layout: 'layout-admin',
            user: req.user,
            places: places,
            categories: categories,
            errors,
            name, location, description, image, price, category
        });
        console.log(errors);
    } else {

        const categoryObj =  await Category.findById(category).exec();

        console.log(categoryObj);

        const newPlace = new Place({
            name,
            location,
            description, 
            image, 
            price, 
        });

        newPlace.category = categoryObj;
        newPlace.categoryName = categoryObj.name;

        newPlace.save()
            .then(place => {
                req.flash('success_msg', `Place "${place.name}" has been created successfully`);
                res.redirect('/dashboard/places');
            })
            .catch(err => console.log(err));
    }
})

router.post('/category', ensureAuthenticated, async (req, res) => {
    const category = Category.find().exec();
    const { name } = req.body;
    const errors = [];

    if (!name) {
        errors.push({ msg: 'Please input all fields' });
    }

    if (errors.length > 0) {
        res.render('category', {
            layout: 'layout-admin',
            user: req.user,
            category: category,
            errors,
            name
        });
        console.log(errors);
    } else {
        const newCategory = new Category({
            name
        });

        newCategory.save()
            .then(place => {
                req.flash('success_msg', `Category "${place.name}" has been created successfully`);
                res.redirect('/dashboard/category');
            })
            .catch(err => console.log(err));
    }
})

router.put('/places/:id', async (req, res) => {
    const { name, location, description, image, price } = req.body;

    try {
        const place = await Place.findById(req.params.id);
        if (!place) {
            req.flash('error_msg', `Place cannot be found`);
            res.redirect('/dashboard/places');
        } else {
            await Place.findByIdAndUpdate(req.params.id, {
                name, location, description, image, price
            });
            req.flash('success_msg', `Place "${name}" has been updated successfully`);
            res.redirect('/dashboard/places');
        }
    } catch (err) {
        console.log(err);
    }
})

router.get('/places/:id', async (req, res) => {
    try {
        const place = await Place.findById(req.params.id).exec();
        if (!place) {
            req.flash('error_msg', `Place cannot be found`);
            res.redirect('/dashboard/places');
        } else {
            await Place.findByIdAndDelete(req.params.id);
            req.flash('warning_msg', `Place "${place.name}" has been deleted successfully`);
            res.redirect('/dashboard/places');
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;