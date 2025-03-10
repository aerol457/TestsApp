import "bootstrap/dist/css/bootstrap.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import testReducer from "./store/reducers/test/test";
import generalReducer from "./store/reducers/general/general";
import authReducer from "./store/reducers/auth/auth";
import studentReducer from "./store/reducers/student/student";
import adminReducer from "./store/reducers/admin/admin";
import DashboardContextProvider from "./context/DashboardContext";
import TestDesignDashContextProvider from "./context/TestDesignDashContext";
import TestContextProvider from "./context/TestContext";

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.log(error);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;

const rootReducer = combineReducers({
  general: generalReducer,
  test: testReducer,
  auth: authReducer,
  student: studentReducer,
  admin: adminReducer,
});

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));

const app = (
  <Provider store={store}>
    <TestDesignDashContextProvider>
      <DashboardContextProvider>
        <TestContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TestContextProvider>
      </DashboardContextProvider>
    </TestDesignDashContextProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

registerServiceWorker();
