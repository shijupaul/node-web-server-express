const fs = require('fs');

const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getFullYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (message) => message.toUpperCase());

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  var timeStamp = new Date().toString();
  var log = `${req.method} made on url ${req.url} at ${timeStamp}`;
  console.log(log);
  fs.appendFileSync('server.log', log + '\n');
  next();
});
app.use((req, res, next) => {
  console.log('redirecting to maintenance page');
  res.render('maintenance.hbs', {
    messageHeader: 'in maintenance',
    messageBody: 'please come back later'
  });
});


// app.get('/', (req, res) => {
//   //res.send('request received'); // response will be send as html
//   res.send({ // sending json back
//     name: 'shiju paul',
//     age: 44
//   });
// })

app.get('/', (req,res) => {
  res.render('home.hbs', {
    pagetTitle: 'Home page...',
    header: 'Welcome to the page'
  })
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pagetTitle: 'About page...'
  });
});

app.get('/bad', (req,res) => {
  res.send ({errorMessage: 'something went wrong'});
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`)
});
