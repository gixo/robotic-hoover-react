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
    directions: []
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
    case types.INPUT_TEXT_AREA_UPDATED:
      return {
        ...state,
        inputTextValue: action.newInputTextValue,
        roomSize: action.newRoomState.roomSize,
        initialRobotPosition: action.newRoomState.initialRobotPosition,
        directions: action.newRoomState.directions,
        dirtPatches: action.newRoomState.dirtPatches
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  roomConfiguration
});

export default rootReducer;
