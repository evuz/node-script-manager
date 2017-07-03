import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import app from './reducers/app';

function configureStore() {
  const appReducers = combineReducers({
    app
  });

  let enhacer;
  if (process.env.NODE_ENV === 'development') {
    enhacer = compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  } else {
    enhacer = applyMiddleware(thunk);
  }

  return createStore(appReducers, enhacer);
}

export default configureStore;
