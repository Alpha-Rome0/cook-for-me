import { UPDATE_RECIPE, LOGIN, BOOKMARK_RECIPE, GET_BOOKMARKS } from '../env'
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
  fetch(LOGIN, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({user: user, password: pass})
  })
  .then((response) => response.json())
  .then((responseJson) => {
    if (responseJson.successful) {
      cookie.save('chefAssistToken', responseJson.token, { path: '/' })
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