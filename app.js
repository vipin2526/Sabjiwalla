const express = require('express');
const routes = require('./src/routes/main');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

// Parse the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Set the view engine (e.g., EJS)
app.set('view engine', 'ejs');

// Routes
app.use('/', routes);

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
