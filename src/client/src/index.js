import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "tachyons";
import App from "./containers/App";

// import App from "./App";
import { searchRobots, requestRobots, requestSpeechToText } from "./reducer";

const logger = createLogger();

const robotReducer = combineReducers({ searchRobots, requestRobots, requestSpeechToText });
const store = createStore(
  robotReducer,
  applyMiddleware(thunkMiddleware, logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
