import * as types from "./ActionTypes";

export const requestInputFileAction = inputFileName => ({
  type: types.REQUEST_INPUT_FILE,
  inputFileName
});

export const receiveInputFileAction = (subreddit, state) => ({
  type: types.RECEIVE_INPUT_FILE,
  roomstate: state
});
