import { createStore, applyMiddleware, combineReducers } from "./mredux";
import thunk from "redux-thunk";
import logger from "redux-logger";
// import logger from "./logger";

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
  combineReducers({
    count: counterReducer,
    count2: couterReducer2,
  }),
  applyMiddleware(thunk, logger)
);

export default store;
