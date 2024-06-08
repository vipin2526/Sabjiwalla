const express = require('express');
const routes = require('./src/routes/main')
const bodyparser = require('body-parser')
const cookieParser =require('cookie-parser')
const path =require('path')
const app = express();

// to parse the req.body
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use(cookieParser());

///////  Template Engin
app.set('views', path.join(__dirname, 'views'));

// Set the view engine (e.g., EJS)
app.set('view engine', 'ejs');

//////

app.use('', routes);
app.use('/public', express.static("public"));



app.listen(process.env.PORT | 5000, () => {
    console.log("running.............");
})