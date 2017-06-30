import { combineReducers } from 'redux';
import {
  SET_PACKAGE_JSON,
  CHANGE_SCRIPT
} from './actionTypes';

export * from './actions';

function changeScript(scripts, newScript) {
  return scripts.map(script => {
    if (script.key === newScript.key) return newScript
    return script
  })
}

function packageJson(state = {}, action) {
  switch (action.type) {
    case SET_PACKAGE_JSON:
      return action.payload.packageJson;
    case CHANGE_SCRIPT:
      return Object.assign({}, state, {
        scripts: changeScript(state.scripts, action.payload.newScript)
      });
    default:
      return state;
  }
}

export default combineReducers({
  packageJson
})
