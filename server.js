 const express = require('express');
 const hbs = require('hbs');
 const fs = require('fs');

 var app=express();
 hbs.registerPartials(__dirname + '/views/partials');

 /* The below isthe Key Value pair */
app.set('view engine','hbs');


/* MIddelware */


app.use((req,res,next) => {
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log',log + '\n',(err) => {
  if(err){
    console.log('Unable to append to server.log.')
  }
});
next();
});


app.use((req,res,next) => {
  res.render('maintenance.hbs');
});

/* We  need to pass the folder path , __dirname stores the path till the project folder*/
app.use(express.static(__dirname + '/public'));

/* Helper */
hbs.registerHelper('getCurrentYear',() =>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase()
});

 app.get('/',(req,res) =>{
    //res.send('<h1> Hello Express ! <h1>');
    res.render('home.hbs',{
      pageTitle :'Home Page',
      welcomeMessage:'Welcome to my website'
    });
 });

/* creating a second route */
app.get('/about',(req,res) => {
  // This will render any of the templates you have set up with your current view
  res.render('about.hbs',{
    pageTitle:'About Page'
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
})

/* Mentoning the port for the app */
 app.listen(3000,() => {
   console.log('Server is up on port 3000');
 });
