const express = require('express')
const http = require("http")
const app = express()
const port = 3000
const inputFile = 'credentials.json'
const fs = require('fs')
var recipes

fs.readFile(inputFile, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('OK: ' + inputFile);
  var localCredentials = JSON.parse(data)
  var dynasty = require('dynasty')(localCredentials);
  recipes = dynasty.table('recipesData').find('test')
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (request, response) => {
  response.send('BROWNTOWN')
});

app.get('/search', (request, response) => {
  if (!request['id']) {
    request['id'] = 1
  }
  recipes.then(function(user) {
    response.send(JSON.parse(user.storedRecipes)[request['id']])
  });
});

app.get('/all', (request, response) => {
  recipes.then(function(user) {
    response.send(JSON.parse(user.storedRecipes))
  });
});

app.listen(port)

console.log("running server for database")
