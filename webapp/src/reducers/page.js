import { CHANGE_PAGE } from '../actions/page'
import update from 'react-addons-update'

const initialState = {page:'recipes'}

export default function page(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return update(state.page,{$set: {page: action.content}})
    default:
      return state
  }
}
