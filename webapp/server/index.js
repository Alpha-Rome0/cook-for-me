const express = require('express')
const http = require("http")
const fs = require('fs')
const restClient = require('../../rest_client')
const app = express()
const port = 3000
const inputFile = 'credentials.json'
const client=new restClient();
const bodyParser = require('body-parser')

var dynasty;

fs.readFile(inputFile, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('OK: ' + inputFile);
  var localCredentials = JSON.parse(data)
  dynasty = require('../../dynasty')(localCredentials)
  recipes = dynasty.table('recipesData').find('test')
})

function getRecipeTable() {
  recipes = dynasty.table('recipesData').find('test')
}

app.use(bodyParser.json())

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
    response.send(user.storedRecipes)
  });
});

app.get('/online', (request, response) => {
  if (!request.query.ingredients) {
    request.query.ingredients = 'tofu'
  }
  return client.getListIngredients(request.query.ingredients).then(function(ingredient) {
    response.send(ingredient)
  })
});

app.post('/new', (request, response) => {
  console.log(request.body)
  recipes.then(function(user) {
    user.storedRecipes.push(request.body)
    dynasty.table('recipesData').insert(user).then(function(resp) {
      console.log(resp)
      getRecipeTable()
    })
  })
  response.sendStatus(200)
})

app.listen(port)

console.log("running server for database")
