import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";

const countReducer = (state = 0, action) => {
  switch (action.type) {
    case "ADD":
      return state + (action.payload || 1);
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    num: countReducer,
  }),
  applyMiddleware(logger)
);

export default store;
