const express = require('express');
const bodyParser = require('body-parser');
const handleNumber = require('./controller');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/', (req, res) => res.render('index'));

app.get('/api', handleNumber);

app.use('/*', (req, res) => res.status(404).render('invalid-route'));

module.exports = app;