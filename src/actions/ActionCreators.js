import * as types from "./ActionTypes";

export const requestInputFileAction = inputFileName => ({
  type: types.REQUEST_INPUT_FILE,
  inputFileName,
  isFetching: true
});

export const receiveInputFileAction = (inputText, roomConfig) => ({
  type: types.RECEIVE_INPUT_FILE,
  inputText,
  roomConfig,
  isFetching: false
});
