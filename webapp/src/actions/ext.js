import { UPDATE_RECIPE } from '../env'

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