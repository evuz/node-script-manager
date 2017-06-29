import { createStore, combineReducers } from 'redux';
import packageJson from './components/App/reducer';

function configureStore() {
  const appReducers = combineReducers({
    packageJson
  });

  return createStore(appReducers);
}

export default configureStore;
