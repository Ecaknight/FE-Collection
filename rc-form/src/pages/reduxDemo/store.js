import { createStore } from "./myredux";
import applyMiddleware from "./applyMiddleware";
import combineReducers from "./combineReducer";

// import { createStore, applyMiddleware, combineReducers } from "redux";
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

const couterReducer2 = (state = { num: 0 }, { type, payload }) => {
  switch (type) {
    case "ADD2":
      return { ...state, num: state.num + payload };
    default:
      return state;
  }
};



const store = createStore(combineReducers({
  count: couterReducer,
  count2: couterReducer2,
}), applyMiddleware(thunk, logger));

export default store;
