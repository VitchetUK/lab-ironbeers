const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  const data = await punkAPI.getBeers();
  res.render('beers', {
    data: data
  });
});

app.get('/random-beer', async (req, res) => {
  const dataRandom = await punkAPI.getRandom();
  res.render('random-beer', {
    dataRandom: dataRandom
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
