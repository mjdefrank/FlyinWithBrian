// Instantiate ExpressJS
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('App listening on ' + PORT);
});
// Set middleware
const bodyParser = require('body-parser');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res, next) {
    res.sendfile('./public/home.html');
})