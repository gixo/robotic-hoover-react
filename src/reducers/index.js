import { combineReducers } from "redux";
import * as types from "../actions/ActionTypes";

const inputFileReducer = (state = "input.txt", action) => {
  switch (action.type) {
    case types.REQUEST_INPUT_FILE:
      return state;
    case types.RECEIVE_INPUT_FILE:
      return state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  inputFileReducer
});

export default rootReducer;
