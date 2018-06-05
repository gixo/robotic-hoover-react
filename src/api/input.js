import {
  requestInputFileAction,
  receiveInputFileAction
} from "../actions/ActionCreators";

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

// The fetch is triggered by the App componentent when the component
// is added to the mounted to the DOM
export const fetchPosts = inputFileURL => dispatch => {
  dispatch(requestInputFileAction(inputFileURL));

  //Adds a mock delay to simulate network activity
  setTimeout(function() {
    return fetch(inputFileURL)
      .then(function(response) {
        if (!response.ok) throw Error(response.statusText);
        response.text().then(function(data) {
          dispatch(receiveInputFileAction(data, parseInput(data)));
        });
      })
      .catch(error => console.log(error));
  }, 500);
};
