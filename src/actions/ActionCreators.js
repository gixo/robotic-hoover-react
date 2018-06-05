import * as types from "./ActionTypes";

export const requestInputFileAction = inputFileName => ({
  type: types.REQUEST_INPUT_FILE,
  inputFileName,
  isFetching: true
});

export const receiveInputFileAction = (inputTextValue, roomConfig) => ({
  type: types.RECEIVE_INPUT_FILE,
  roomConfig,
  inputTextValue
});

export const inputTextAreaUpdated = newInputTextValue => ({
  type: types.INPUT_TEXT_AREA_UPDATED,
  newInputTextValue
});
