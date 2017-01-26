import { combineReducers } from 'redux'
import stepReducer from './steps'
import pageReducer from './page'

const rootReducer = combineReducers({
  stepReducer,
  pageReducer
});

export default rootReducer;
