const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/flyin-with-brian', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
const path = require('path');
// Set middleware
const bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'pug');
app.set('views', './views');

//  Set all GET routes
app.get('/', function (req, res) {
    res.render('index')
});

app.get('/home', function(req, res, next) {
    res.render('index');
});
app.get('/about', function(req, res, next) {
    res.render('about');
});
// TODO Create a profile route with user's ID in req.params
app.get('/user/:userId', function(req, res, next) {
    res.render('userProfile');
});