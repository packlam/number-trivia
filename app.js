const app = require('express')();
const bodyParser = require('body-parser');
const handleNumber = require('./controller');

app.use(bodyParser.json());

app.get('/api/:number', handleNumber);

module.exports = app;