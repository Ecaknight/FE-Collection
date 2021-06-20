// import React from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import saga from "redux-saga";
import { loginReducer } from "./loginReducer";
import rootSaga from "../action/rootSaga";

const sagaMiddleware = saga();

const store = createStore(
  combineReducers({ user: loginReducer }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
