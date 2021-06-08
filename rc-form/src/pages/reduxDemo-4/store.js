import { createStore, applyMiddleware, combineReducer } from "./mredux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
import thunk from "./reduxThunk";
import logger from "./logger";
import reduxPromise from "./reduxPromise";

const counterReducer = (state = 0, action) => {
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
  combineReducer({
    count: counterReducer,
    count2: couterReducer2,
  }),
  applyMiddleware(thunk, logger, reduxPromise)
);

export default store;
