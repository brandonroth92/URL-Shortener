const express = require('express');
const database = require('./database.js');
const path = require('path');
const app = express();

//Use port 1337 by default
app.set('port', (process.env.PORT || 1337));

//Connect to database once and use connection for both get requests
database.connect(function() {
  app.listen(app.get('port'));
  console.log(`Server listening on port ${app.get('port')}`);
  
  //Server index file located in 'client' directory
  app.use(express.static(path.resolve(__dirname, 'client')));
  
  //Get original url
  app.get('/new/*//:url', function(req, res) {
    var url = 'https://' + req.params.url;
    
    //Store url in database and retrieve JSON object
    database.addAndReturn(sender, url);
    
    //Send object in response to client
    function sender(result) {
      res.writeHeader(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    };
  });
  
  //Get shortened url
  app.get('/:num', function(req, res) {
    var shortURL = 'https://brandonr-shorturl.herokuapp.com/' + req.params.num;
    
    //Query db for original url
    database.queryAndReturn(redirector, shortURL);
    
    //Redirect user to original url
    function redirector(result) {
      var redirect = result.original_url;
      res.redirect(redirect);
    };
  });
  
  //Send error response if url is invalid
  app.get('/new/*', function(req, res) {
    res.status(400);
    res.end(JSON.stringify({ Error: "Must use valid protocol and real site"}));
  });
  
});









