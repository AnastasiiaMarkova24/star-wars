import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from 'history';
import * as Films from '../store/films-reducer';

const history = createBrowserHistory();
const middleware = [thunk, routerMiddleware(history)];

const rootReducer = combineReducers({
    films: Films.reducer,
    router: connectRouter(history),
});

const enhancers = [];
const windowIfDefined =
    typeof window === "undefined" ? null : (window as any);
if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
}

export type RootReducer = ReturnType<typeof rootReducer>

export const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middleware), ...enhancers)
);