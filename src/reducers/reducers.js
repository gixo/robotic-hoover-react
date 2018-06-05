import { combineReducers } from "redux";
import * as types from "../actions/ActionTypes";

const roomConfiguration = (
  state = {
    inputFileName: "input.txt",
    isFetching: true,
    inputTextValue: "Loading...",
    roomSize: [10, 10],
    dirtPatches: [],
    robotLocation: [0, 0],
    directions: [],
    isInputValid: true
  },
  action
) => {
  switch (action.type) {
    case types.REQUEST_INPUT_FILE:
      return state;
    case types.RECEIVE_INPUT_FILE:
      return {
        ...state,
        isFetching: false
      };
    case types.INPUT_TEXT_AREA_UPDATED:
      return {
        ...state,
        inputTextValue: action.newInputTextValue
      };
    case types.INCORRECT_INPUT_PASSED:
      return {
        ...state,
        isInputValid: false
      };
    case types.ROOM_SPEC_UPDATED:
      return {
        ...state,
        roomSize: action.newRoomState.roomSize,
        initialRobotPosition: action.newRoomState.initialRobotPosition,
        directions: action.newRoomState.directions,
        dirtPatches: action.newRoomState.dirtPatches,
        isInputValid: action.newRoomState.isInputValid
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  roomConfiguration
});

export default rootReducer;
