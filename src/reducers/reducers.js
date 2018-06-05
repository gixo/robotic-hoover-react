import { combineReducers } from "redux";
import * as types from "../actions/ActionTypes";

const roomConfiguration = (
  state = {
    inputFileName: "input.txt",
    isFetching: true,
    inputTextValue: "Loading..."
  },
  action
) => {
  switch (action.type) {
    case types.REQUEST_INPUT_FILE:
      return state;
    case types.RECEIVE_INPUT_FILE:
      return {
        ...state,
        inputText: action.inputText,
        roomConfig: action.roomConfig
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  roomConfiguration
});

export default rootReducer;
