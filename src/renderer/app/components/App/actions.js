import {
  SET_PACKAGE_JSON
} from './actionTypes';

export function setPackageJson(packageJson) {
  return {
    type: SET_PACKAGE_JSON,
    payload: {
      packageJson
    }
  }
}
