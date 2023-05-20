const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', {layout: 'layout-auth'});
})

module.exports = router;

