import { createStore, combineReducers } from 'redux';
import app from './reducers/app';

function configureStore() {
  const appReducers = combineReducers({
    app
  });

  let enhacer;
  if (process.env.NODE_ENV === 'development') {
    enhacer = 
      window.devToolsExtension ? window.devToolsExtension() : f => f;
  } else {
    enhacer = {};
  }

  return createStore(appReducers, enhacer);
}

export default configureStore;
