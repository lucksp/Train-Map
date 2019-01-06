import { AppContainer } from "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./redux/createStore";

import "../styles/style.scss";

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <App />
      </AppContainer>
    </Provider>,
    document.getElementById("root")
  );

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept();
  const NextApp = require("./components/App").default;
  render(NextApp);
}
