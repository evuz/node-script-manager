import { createStore, combineReducers } from 'redux';
import app from './reducers/app';

function configureStore() {
  const appReducers = combineReducers({
    app
  });

  return createStore(appReducers);
}

export default configureStore;
