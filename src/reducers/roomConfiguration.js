import * as types from "../actions/ActionTypes";

const initialState = {
  inputFileName: "input.txt",
  isFetching: true,
  inputTextValue: "Loading...",
  roomSize: [5, 5],
  isInputValid: true
};

const roomConfiguration = (state = initialState, action) => {
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
        isInputValid: false,
        errorMessage: action.errorMessage
      };
    case types.ROOM_SPEC_UPDATED:
      return {
        ...state,
        roomSize: action.newRoomState.roomSize,
        isInputValid: action.newRoomState.isInputValid
      };
    default:
      return state;
  }
};

export default roomConfiguration;
