import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

const initialState =
  typeof window !== "undefined" ? window.__INITIAL_STATE__ : {};

const enhancers = compose(
  applyMiddleware(thunk),
  typeof window !== "undefined" && window.devToolsExtension
    ? window.devToolsExtension()
    : f => f
);

const store = createStore(rootReducer, initialState, enhancers);

/*
  Enable Hot Reloading for the reducers
  We re-require() the reducers whenever any new code has been written.
  Webpack will handle the rest
*/

if (module.hot) {
  module.hot.accept("./reducers/", () => {
    const nextRootReducer = require("./reducers/index").default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
