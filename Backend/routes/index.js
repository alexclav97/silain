const express = require('express');
const app = express();

const basicSearch = require('./basicSearch.js');
const filters = require('./filters.js');
const article = require('./article.js');
const map = require('./map.js');
const users = require('./users.js');
const makepublic = require('./makepublic.js');
const licence = require('./licence.js');


app.use('/basic', basicSearch);
app.use('/getfilters', filters);
app.use('/article', article);
app.use('/map', map);
app.use('/users', users);
app.use('/makepublic', makepublic);
app.use('/licence', licence);


module.exports = app;
