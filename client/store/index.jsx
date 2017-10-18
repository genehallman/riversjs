import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { routerReducer, routerMiddleware, push } from 'react-router-redux'
import ReduxPromise from 'redux-promise';
import api from './apiReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configure(history) {
  const middleware = routerMiddleware(history);

  return createStore(
    combineReducers({api, router: routerReducer}),
    {}, // initial state
    composeEnhancers(
      applyMiddleware(middleware),
      applyMiddleware(ReduxPromise)
    )
  );
}
