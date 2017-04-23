const express = require('express')
const http = require("http")
const fs = require('fs')
const restClient = require('../../rest_client')
const app = express()
const port = 3000
const inputFile = 'credentials.json'
const client=new restClient();
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const secret = 'cranberry'
var userId = 'test'

const createToken = (user) => jwt.sign(({user}), secret, {expiresIn: '7d'})

const checkUserMiddleware = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.token, secret)
    req.user = decoded
    return next()
  } catch (err) {
    return res.sendStatus(401)
  }
}

var dynasty;

fs.readFile(inputFile, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('OK: ' + inputFile);
  var localCredentials = JSON.parse(data)
  dynasty = require('../../dynasty')(localCredentials)
  recipes = dynasty.table('recipesData').find(userId)
})

function getRecipeTable() {
  recipes = dynasty.table('recipesData').find(userId)
}

app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (request, response) => {
  response.send('CookForMe Web Backend')
});

app.get('/search', (request, response, userId) => {
  if (!request['id']) {
    request['id'] = 1
  }
  getRecipeTable()
  recipes.then(function(user) {
    response.send(JSON.parse(user.storedRecipes)[request['id']])
  });
});

app.get('/all', (request, response, userId) => {
  getRecipeTable()
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
  getRecipeTable()
  recipes.then(function(user) {
    user.storedRecipes.push(request.body)
    dynasty.table('recipesData').insert(user).then(function(resp) {
      console.log(resp)
      getRecipeTable()
    })
  })
  response.sendStatus(200)
})

app.post('/bookmark', (request, response) => {
  console.log(request.body)
  //getRecipeTable()
  dynasty.table('recipesData').find(userId).then(function(user) {
    if (user.bookmarked == null) {
      user.bookmarked = []
    }
    var i = user.bookmarked.map(function(recipe) {
      return recipe.id
    }).indexOf(request.body.id)
    if (i == -1) {
      user.bookmarked.push(request.body)
    } else {
      user.bookmarked = user.bookmarked.filter(function(recipe) {
        return recipe.id != request.body.id
      })
    }
    dynasty.table('recipesData').insert(user).then(function(resp) {
        console.log(resp)
        getRecipeTable()
      })
  })
  response.sendStatus(200)
})

app.get('/getbookmarks', (request, response) => {
  console.log('get bookmarks')
  //getRecipeTable()
  console.log(userId)
  dynasty.table('recipesData').find(userId).then(function(user) {
    if (user.bookmarked != null) {
      response.send({bookmarks: user.bookmarked})
    } else {
      response.send({bookmarks: [] })
    }
  })
})

app.post('/update', (request, response) => {
  var index = request.body.index
  delete request.body['index']
  dynasty.table('recipesData').find(userId).then(function(user) {
    user.storedRecipes[index] = request.body
    console.log(user.storedRecipes)
    dynasty.table('recipesData').insert(user).then(function(resp) {
      console.log(resp)
      getRecipeTable()
    })
  })
  response.sendStatus(200)
})

app.post('/login', (request, response) => {
  console.log(request.body)
  dynasty.table('loginData').find(request.body.user).then(function(user) {
    if (!user) {
      response.send({successful: false, token: null})
    } else if (user.password == request.body.password) {
      const token = createToken(user.aId)
      console.log(token)
      userId = user.aId
      response.send({successful: true, token: token})
    }
  })
})

app.post('/register', (request, response) => {
  console.log(request.body)
  user = {username: request.body.user, password: request.body.password, 
          userId: request.body.id}
  console.log(user)
  return dynasty.table('loginData').insert(user).then(function(user) {
      response.send({successful: true})
  })
})

app.listen(port)

console.log("running server for database")
