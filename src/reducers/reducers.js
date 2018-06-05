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
        inputTextValue: action.inputTextValue,
        roomSize: action.roomConfig.roomSize,
        initialRobotPosition: action.roomConfig.initialRobotPosition,
        directions: action.roomConfig.directions,
        dirtPatches: action.roomConfig.dirtPatches,
        isFetching: false
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  roomConfiguration
});

export default rootReducer;
