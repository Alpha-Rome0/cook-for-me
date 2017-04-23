import { ADD_STEP, REMOVE_STEP, SUBMIT_RECIPE, ADD_INGREDIENT, REMOVE_INGREDIENT, UPDATE_DESCRIPTION_DURATION, UPDATE_DESCRIPTION_SUMMARY, UPDATE_TITLE } from '../actions/steps'
import update from 'react-addons-update'
import { submitRecipe } from '../actions/ext.js'

const initialState = {
  title: '',
  description:{
    duration:'0',
    summary:''
  },
  ingredients:[],
  steps:[]
}


export default function steps(state = initialState, action) {
  switch (action.type) {
    case ADD_STEP:
      return update(state, {steps: {$push: [action.content]}})
    case REMOVE_STEP:
      return update(state, {steps: {$splice: [[action.index, 1]]}})
    case ADD_INGREDIENT:
      return update(state, {ingredients: {$push: [action.ingredient]}})
    case REMOVE_INGREDIENT:
      return update(state, {ingredients: {$splice: [[action.index, 1]]}})
    case UPDATE_TITLE:
      return update(state, {title: {$set: action.title}})
    case UPDATE_DESCRIPTION_DURATION:
      return update(state, {description: {duration: {$set: action.duration}}})
    case UPDATE_DESCRIPTION_SUMMARY:
      return update(state, {description: {summary: {$set: action.summary}}})
    case SUBMIT_RECIPE:
      submitRecipe(state)
      return initialState
    default:
      return state
  }
}
