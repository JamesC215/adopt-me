// Always require and config near the top
require('dotenv').config();

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');


// Connect to the database
require('./config/database')

const app = express();

app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to check and verify a JWT and
// Assign the user object from the JWt to req.user
app.use(require('./config/checkToken'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
// Protect Routes
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/orders', ensureLoggedIn, require('./routes/api/orders'));
app.use('/api/items', ensureLoggedIn, require('./routes/api/items'));
// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

const port = process.env.PORT || 5001;

app.listen(port, function() {
    console.log(`Express app running on port ${port}`)
  });