import {
  SET_PACKAGE_JSON,
  CHANGE_SCRIPT,
  ADD_OUTPUT_SCRIPT,
  REMOVE_OUTPUT_SCRIPT
} from './actionTypes';
import { runTask, stopTask } from './task';

export function setPackageJson(packageJson) {
  return {
    type: SET_PACKAGE_JSON,
    payload: {
      packageJson
    }
  }
}

export function runScript(script) {
  return (dispatch) => {
    const run = !script.run;
    let proc;

    if (run) proc = runTask(script.command, (data) =>
      dispatch(addOutput(script.key, data))
    );
    else stopTask(script.proc, () => dispatch(removeOutput(script.key)));

    const newScript = Object.assign({}, script, {
      run: run,
      proc
    });
    dispatch(changeScript(newScript))
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

export function removeOutput(key) {
  return {
    type: REMOVE_OUTPUT_SCRIPT,
    payload: {
      key
    }
  }
}
