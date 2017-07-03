import { combineReducers } from 'redux';
import {
  SET_PACKAGE_JSON,
  CHANGE_SCRIPT,
  ADD_OUTPUT_SCRIPT
} from './actionTypes';

export * from './actions';

function changeScript(scripts, newScript) {
  return scripts.map(script => {
    if (script.key === newScript.key) return newScript
    return script
  })
}

function addOutput(scripts, key, data) {
  return scripts.map(script => {
    if (script.key === key) {
      let { output = '' } = script;
      output += data;
      return Object.assign({}, script, { output });
    }
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
    case ADD_OUTPUT_SCRIPT:
      return Object.assign({}, state, {
        scripts: addOutput(state.scripts, action.payload.key, action.payload.data)
      });
    default:
      return state;
  }
}

export default combineReducers({
  packageJson
})
