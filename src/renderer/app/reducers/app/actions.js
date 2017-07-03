import {
  SET_PACKAGE_JSON,
  CHANGE_SCRIPT,
  ADD_OUTPUT_SCRIPT
} from './actionTypes';

export function setPackageJson(packageJson) {
  return {
    type: SET_PACKAGE_JSON,
    payload: {
      packageJson
    }
  }
}

export function changeScript(newScript) {
  return {
    type: CHANGE_SCRIPT,
    payload: {
      newScript
    }
  }
}

export function addOutput(key, data) {
  return {
    type: ADD_OUTPUT_SCRIPT,
    payload: {
      key,
      data
    }
  }
}
