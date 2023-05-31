const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 5002;

// Passport Configuration
require('./config/passport')(passport); 

// Database Configuration
const db = require('./config/keys').MongoURI;

// Connect to Database
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.log(err));

// EJS Middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layout-auth', "layout-admin");

// Express Session Middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash Middleware
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.warning_msg = req.flash('warning_msg');
    res.locals.error = req.flash('error');
    next();
});

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Libraries Middleware
app.use("/", express.static("./node_modules/bootstrap/dist/"));
app.use('/', express.static("./src/"));
app.use('/', express.static("./node_modules/fontawesome-free-6.2.1/"));
app.use('/', express.static("./node_modules/@popperjs/core/dist/"));
app.use('/', express.static("./node_modules/jquery/"));

// Routes
app.use('/', require('./routes/index'));
app.use('/authenticate', require('./routes/authenticate'));
app.use('/dashboard', require('./routes/dashboard'));

app.listen(PORT, console.log(`Server listening on ${PORT}`));