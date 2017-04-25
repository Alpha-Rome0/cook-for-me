const express = require('express')
const cors = require('cors')
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
    const decoded = jwt.verify(req.headers['authorization'], secret)
    console.log(decoded)
    req.userId = decoded.user
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

app.options('*', cors())

app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (request, response) => {
  response.send('CookForMe Web Backend')
});

app.get('/all', checkUserMiddleware, (request, response) => {
  dynasty.table('recipesData').find(request.userId).then(function(user) {
    if (user) {
      if (user.storedRecipes) {
        response.send(user.storedRecipes)
      } else {
        response.send([])
      }
    } else {
      response.status(401).send('User not found')
    }
  })
});

app.get('/online', (request, response) => {
  if (!request.query.ingredients) {
    request.query.ingredients = 'tofu'
  }
  return client.getListIngredients(request.query.ingredients).then(function(ingredient) {
    response.send(ingredient)
  })
});

app.post('/new', checkUserMiddleware, (request, response) => {
  dynasty.table('recipesData').find(request.userId).then(function(user) {
    if (user) {
      user.storedRecipes.push(request.body)
      dynasty.table('recipesData').insert(user).then(function(resp) {
        console.log(resp)
        getRecipeTable()
      })
      response.sendStatus(200)
    } else {
      response.status(401).send('User not found')
    }
  })
})

app.post('/bookmark', checkUserMiddleware, (request, response) => {
  dynasty.table('recipesData').find(request.userId).then(function(user) {
    if (user) {
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
      response.sendStatus(200)
    } else {
      response.status(401).send('User not found')
    }
  })
})

app.get('/getbookmarks', checkUserMiddleware, (request, response) => {
  dynasty.table('recipesData').find(request.userId).then(function(user) {
    if (user) {
      if (user.bookmarked != null) {
        response.send({bookmarks: user.bookmarked})
      } else {
        response.send({bookmarks: [] })
      }
    } else {
      response.status(401).send('User not found')
    }
  })
})

app.post('/update', checkUserMiddleware, (request, response) => {
  dynasty.table('recipesData').find(request.userId).then(function(user) {
    if (user) {
      var index = request.body.index
      delete request.body['index']
      user.storedRecipes[index] = request.body
      dynasty.table('recipesData').insert(user).then(function(resp) {
        getRecipeTable()
      })
      response.sendStatus(200)
    } else {
      response.status(401).send('User not found')
    }
  })
})

app.post('/login', (request, response) => {
  console.log(request.body)
  dynasty.table('loginData').find(request.body.user).then(function(user) {
    if (!user) {
      response.send({successful: false, token: null})
    } else if (user.password == request.body.password) {
      console.log(user.userId)
      const token = createToken(user.userId)
      console.log(jwt.verify(token, secret))
      response.send({successful: true, token: token})
    }
  })
})

app.post('/register', (request, response) => {
  console.log(request.body)
  user = {username: request.body.user, password: request.body.password, 
          userId: request.body.id}
  console.log(user)
  recipeData = {userId: request.body.id, storedRecipes: [], bookmarks: [] }
  dynasty.table('recipesData').insert(recipeData)
  return dynasty.table('loginData').insert(user).then(function(user) {
      response.send({successful: true})
  })
})

app.post('/checkuser', (request, response) => {
  dynasty.table('loginData').find(request.body.user).then(function(user) {
    if (!user) {
      dynasty.table('loginData').find({userId: request.body.userId}).then(function(user) {
          if(!user) {
            response.send({existsLogin: false, existsID: false})
          } else {
            response.send({existsLogin: false, existsID: true})
          }
      })
    } else {
      response.send({existsLogin: true, existsID: false})
    }
  })
})


app.listen(port)

console.log("running server for database")
