const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('App listening on ' + PORT);
});
const path = require('path');
// Set middleware
const bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res, next) {
    res.sendfile('./public/home.html');
});
app.get('/about', function(req, res, next) {
    res.sendfile('./public/about.html');
});
//TODO create a profile route with user's ID in req.params