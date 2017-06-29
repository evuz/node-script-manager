import { combineReducers } from 'redux';
import {
  SET_PACKAGE_JSON
} from './actionTypes';

export * from './actions';

function packageJson(state = {}, action) {
  switch (action.type) {
    case SET_PACKAGE_JSON:
      return action.payload.packageJson;
    default:
      return state;
  }
}

export default combineReducers({
  packageJson
})
