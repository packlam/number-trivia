const express = require('express');
const bodyParser = require('body-parser');
const handleNumber = require('./controller');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/api/:number', handleNumber);

module.exports = app;