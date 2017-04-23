import { UPDATE_RECIPE, LOGIN, BOOKMARK_RECIPE, GET_BOOKMARKS, REGISTER } from '../env'
import cookie  from 'react-cookie'

export function updateRecipe(i, recipe) {
  console.log('update recipe')
  recipe.index = i
  console.log(recipe)
  fetch(UPDATE_RECIPE, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
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

export function bookmarkRecipe(recipe) {
  console.log('bookmark recipe')
  fetch(BOOKMARK_RECIPE, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(recipe)
  })
}

export function getBookmarks() {
  console.log('get bookmarks')
  return fetch(GET_BOOKMARKS)
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.bookmarks
    })
}
