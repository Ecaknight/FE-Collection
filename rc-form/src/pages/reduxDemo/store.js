import { createStore } from "./myredux";
import applyMiddleware from "./applyMiddleware";
// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
import thunk from "./reduxThunk";
// import logger from "redux-logger";
import logger from "./reduxLog";

const couterReducer = (state = 0, action) => {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(couterReducer, applyMiddleware(thunk, logger));

export default store;
