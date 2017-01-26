import { CHANGE_PAGE } from '../actions/page'
import update from 'react-addons-update'

const initialState = 'recipes'

export default function page(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return update(state, {$set: action.e})
    default:
      return state
  }
}
