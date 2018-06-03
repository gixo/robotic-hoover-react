import * as types from "./ActionTypes";

export const requestInputFile = subreddit => ({
  type: types.REQUEST_INPUT_FILE,
  subreddit
});

export const receiveInputFile = (subreddit, state) => ({
  type: types.RECEIVE_INPUT_FILE,
  roomstate: state
});

const parseInput = textinput => {
  const inputLines = textinput.split("\n");

  const state = {
    roomSize: inputLines[0].split(" "),
    initialRobotPosition: inputLines[1].split(" "),
    directions: inputLines[inputLines.length - 1],
    dirtPatches: inputLines
      .slice(2, inputLines.length - 1)
      .map(line => line.split(" "))
  };

  return state;
};

export const fetchPosts = inputFileURL => dispatch => {
  dispatch(requestInputFile(inputFileURL));
  return fetch(inputFileURL)
    .then(function(response) {
      if (!response.ok) throw Error(response.statusText);
      response.text().then(function(data) {
        dispatch(receiveInputFile(inputFileURL, parseInput(data)));
      });
    })
    .catch(error => console.log(error));
};
