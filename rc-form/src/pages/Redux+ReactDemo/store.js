import { createStore, applyMiddleware, combinaReducer } from "../../lib/redux";
import logger from "redux-logger";

const countReducer = (state = 0, action) => {
  switch (action.type) {
    case "ADD":
      return state + (action.payload || 1);
    case "MINUS":
      return state - (action.payload || 1);
    default:
      return state;
  }
};

const count2 = (state = { num: 0 }, action) => {
  switch (action.type) {
    case "ADD2":
      return { ...state, num: state.num + 1 };

    default:
      return state;
  }
};

const store = createStore(
  combinaReducer({
    count: countReducer,
    count2: count2,
  }),
  applyMiddleware(logger)
);

export default store;
