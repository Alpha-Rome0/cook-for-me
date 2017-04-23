import { NEW_RECIPE, UPDATE_RECIPE, LOGIN, BOOKMARK_RECIPE, GET_BOOKMARKS, REGISTER, CHECK, ALL_RECIPES } from '../env'
import cookie  from 'react-cookie'

const headers = new Headers()


export function updateRecipe(i, recipe) {
  console.log('update recipe')
  const myHeaders = new Headers()
  const token = cookie.load('chefAssistToken')
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', token)
  recipe.index = i
  console.log(recipe)
  fetch(UPDATE_RECIPE, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(recipe)
  })
}

export function login(user, pass) {
  console.log('trying login')
  return fetch(LOGIN, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({user: user, password: pass})
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if (responseJson.successful) {
      cookie.save('chefAssistToken', responseJson.token, { path: '/' })
      console.log("Cookie successful. Returning true...")
      return true;
    } else {
      return false;
    }
  })
}

export function register(user, pass, id) {
  console.log('trying register')
  console.log(id)
  return fetch(REGISTER, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({user: user, password: pass,
                          id: id})
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if (responseJson.successful) {
      console.log("Registration successful. Returning true...")
      return true;
    }
  })
}

export function checkuser(user, pass, id) {
  console.log('checking user')
  return fetch(CHECK, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({user: user, password: pass,
                          id: id})
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if (responseJson.exists) {
      console.log("user exists.")
      return true;
    } else {
      console.log("user does not exist.")
      return false;
    }
  })
}

export function bookmarkRecipe(recipe) {
  console.log('bookmark recipe')
  const myHeaders = new Headers()
  const token = cookie.load('chefAssistToken')
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', token)
  fetch(BOOKMARK_RECIPE, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(recipe)
  })
}

export function getBookmarks() {
  console.log('get bookmarks')
  const myHeaders = new Headers()
  const token = cookie.load('chefAssistToken')
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', token)
  const init = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors'
  }
  return fetch(GET_BOOKMARKS, init)
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson.bookmarks
  })
}

export function getStoredRecipes() {
  console.log('get stored recipes')
  const myHeaders = new Headers()
  const token = cookie.load('chefAssistToken')
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', token)
  const init = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors'
  }
  return fetch(ALL_RECIPES, init)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson
    })
}

export function submitRecipe(recipe) {
  const myHeaders = new Headers()
  const token = cookie.load('chefAssistToken')
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', token)
  console.log(recipe)
  fetch(NEW_RECIPE, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(recipe)
  })
}

