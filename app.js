const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 5001;

// EJS Middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layout-auth');

// Libraries Middleware
app.use("/", express.static("./node_modules/bootstrap/dist/"));
app.use('/', express.static("./src/"));
app.use('/', express.static("./node_modules/fontawesome-free-6.2.1/"));
app.use('/', express.static("./node_modules/@popperjs/core/dist/"));

// Routes
app.use('/', require('./routes/index'));
app.use('/authenticate', require('./routes/authenticate'));

app.listen(PORT, console.log(`Server listening on ${PORT}`));