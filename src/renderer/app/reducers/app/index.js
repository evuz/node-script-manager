import { combineReducers } from 'redux';
import {
  SET_PACKAGE_JSON,
  CHANGE_SCRIPT,
  ADD_OUTPUT_SCRIPT,
  REMOVE_OUTPUT_SCRIPT
} from './actionTypes';

export * from './actions';

function changeScript(scripts, newScript) {
  return scripts.map(script => {
    if (script.key === newScript.key) return newScript
    return script
  })
}

function setOutput(scripts, key, data, add) {
  return scripts.map(script => {
    if (script.key === key) {
      let { output = [] } = script;
      if (add) {
        output.push(data);
      } else {
        output = data;
      }
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
        scripts: setOutput(state.scripts, action.payload.key, `\n${action.payload.data}`, true)
      });
    case REMOVE_OUTPUT_SCRIPT:
      return Object.assign({}, state, {
        scripts: setOutput(state.scripts, action.payload.key, undefined, false)
      });
    default:
      return state;
  }
}

export default combineReducers({
  packageJson
})
