import { createStore, combineReducers } from 'redux';
import app from './components/App/reducer';

function configureStore() {
  const appReducers = combineReducers({
    app
  });

  return createStore(appReducers);
}

export default configureStore;
