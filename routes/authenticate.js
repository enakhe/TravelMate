const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', { layout: 'layout-auth' });
})

router.get('/register', (req, res) => {
    res.render('register', { layout: 'layout-auth' });
})

module.exports = router;

