var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//ROUTES
app.use('/', require('./routes/routes'));


app.listen(3000, function() {
    console.log('Express server listening');
});