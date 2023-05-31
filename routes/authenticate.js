const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const passport = require('passport');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', { layout: 'layout-auth' });
})

router.get('/register', (req, res) => {
    res.render('register', { layout: 'layout-auth' });
})

router.post('/register', (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    let errors = [];

    // Check required fields
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        errors.push({ msg: 'Please fill in the required fields' })
    }

    // Check passwords match
    if (password !== confirmPassword) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // Check password length
    if (password.length < 6) {
        errors.push({ msg: 'Passwords should be at east 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            firstName,
            lastName,
            email,
            password,
            confirmPassword: false,
        });
        console.log(errors);
    } else {
        // Validation Pass
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    // User Exists
                    errors.push({ msg: `User with the email: ${user.email}, already exists` });
                    res.render('register', {
                        errors,
                        firstName,
                        lastName,
                        email,
                        password,
                        confirmPassword
                    })
                } else {
                    const newUser = new User({
                        firstName,
                        lastName,
                        email,
                        password
                    });

                    // Hash Password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            // Set Password to hash value
                            newUser.password = hash;

                            // Save User
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered you can login');
                                    res.redirect("/authenticate/login");
                                })
                                .catch(err => console.log(err));
                        }))
                }
            });
    }
});

// Login Route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/authenticate/login',
        failureFlash: true
    })(req, res, next)
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.flash('success_msg', "Successfully logged out!");
        res.redirect('/');
    });
})

module.exports = router;

