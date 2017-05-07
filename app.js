'use strict'


const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');

const app = express(); 
const api = require('./routes');

app.engine('.hbs', hbs({
	defaultlayout: 'default',
	ext:'.hbs'
}))
app.set('view engine', '.hbs');


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api', api); 

app.get('/login', (req, res) =>{
	res.render('login')
}); 
 
 module.exports = app;