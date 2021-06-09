import { createStore, applyMiddleware, conbineReducer } from "./mredux";
import logger from "redux-logger";
// import thunk from "redux-thunk";
import thunk from "./thunk";

import reduxPromise from "redux-promise";

const countReducer = (state = 0, action) => {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
};

const couterReducer2 = (state = { num: 0 }, { type, payload }) => {
  switch (type) {
    case "ADD2":
      return { ...state, num: state.num + payload };
    default:
      return state;
  }
};

const store = createStore(
  conbineReducer({ count: countReducer, count2: couterReducer2 }),
  applyMiddleware(thunk, logger, reduxPromise)
);

export default store;
