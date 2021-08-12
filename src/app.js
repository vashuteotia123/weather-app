const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicDirPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

//Views configuration
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Static directory
app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Vishal Teotia',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    contact: '6359653258',
    title: 'Help portal',
    name: 'Vishal Teotia',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    about: 'Hey there, this is a simple webapp developed using Node.js',
    title: 'About',
    name: 'Vishal Teotia',
  });
});

app.get('/weather', (req, res) => {
  forecast(req.query.cityname, (error, forecast) => {
    if (error) {
      return res.send({ error });
    }
    res.send({
      forecast: forecast,
    });
  });
});

// app.get('/products', (req, res) => {
//   if (!req.query.search) {
//     res.send({
//       error: 'No search',
//     });
//     return;
//   }
//   console.log(req.query.search);
//   res.send({
//     products: [],
//   });
// });
app.get('*', (req, res) => {
  res.render('404');
});

//app.com
//app.com/help
//app.com/about
//app.com/weather

app.listen(port, () => {
  console.log('Server started successfully on port' + port);
});
