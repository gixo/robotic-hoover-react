import * as types from "./ActionTypes";

export const requestInputFileAction = inputFileName => ({
  type: types.REQUEST_INPUT_FILE,
  inputFileName,
  isFetching: true
});

export const receiveInputFileAction = inputTextValue => ({
  type: types.RECEIVE_INPUT_FILE,
  inputTextValue
});

export const incorrectInputPassed = isInputValid => ({
  type: types.INCORRECT_INPUT_PASSED,
  isInputValid
});

export const inputTextAreaUpdated = newInputTextValue => ({
  type: types.INPUT_TEXT_AREA_UPDATED,
  newInputTextValue
});

export const roomSpecUpdated = newRoomState => ({
  type: types.ROOM_SPEC_UPDATED,
  newRoomState
});

export const parseStateFromText = newInputTextValue => dispatch => {
  const newRoomState = parseInput(newInputTextValue);
  dispatch(inputTextAreaUpdated(newInputTextValue));
  if (newRoomState.isInputValid) dispatch(roomSpecUpdated(newRoomState));
  else dispatch(incorrectInputPassed(false));
};

const parseInput = textinput => {
  if (validateTextInput(textinput)) {
    const inputLines = textinput.split("\n");

    return {
      roomSize: inputLines[0].trim().split(" "),
      initialRobotPosition: inputLines[1].split(" "),
      directions: inputLines[inputLines.length - 1],
      dirtPatches: inputLines
        .slice(2, inputLines.length - 1)
        .map(line => line.trim().split(" ")),
      isInputValid: true
    };
  } else return { isInputValid: false };
};

const validateTextInput = textinput => {
  //A valid input has at leasat 2 lines with numbers, followed by directions,
  //we also account for different carriage return types
  const inputRegExp = /^([0-9]+ [0-9]+(\r\n|\n|\r)){2,}([NSWE]+)$/;
  const isMatch = inputRegExp.test(textinput);
  return isMatch;
};

// The fetch is triggered by the App componentent when the component
// is added to the mounted to the DOM
export const fetchInputFile = inputFileURL => dispatch => {
  dispatch(requestInputFileAction(inputFileURL));

  //Adds a mock delay to simulate network activity
  setTimeout(function() {
    return fetch(inputFileURL)
      .then(function(response) {
        if (!response.ok) throw Error(response.statusText);
        response.text().then(function(data) {
          dispatch(receiveInputFileAction(data));
          dispatch(inputTextAreaUpdated(data));
          dispatch(parseStateFromText(data));
        });
      })
      .catch(error => console.log(error));
  }, 500);
};
