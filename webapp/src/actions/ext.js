import { UPDATE_RECIPE, LOGIN } from '../env'
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