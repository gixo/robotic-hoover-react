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

export const robotSpecUpdated = newRoomState => ({
  type: types.ROBOT_SPEC_UPDATED,
  newRoomState
});

export const robotNavigationStarted = (robotPosition, directions) => ({
  type: types.ROBOT_NAVIGATION_STARTED,
  robotPosition,
  directions
});

export const moveRobotEast = roomState => ({
  type: types.MOVE_ROBOT_EAST,
  roomState
});

export const removeDirtPatch = robotLocation => ({
  type: types.REMOVE_DIRT_PATCH,
  robotLocation
});

export const setRobotCoordinates = robotPosition => ({
  type: types.SET_ROBOT_COORDINATES,
  robotPosition
});

export const robotPositionUpdated = robotPosition => ({
  type: types.SET_ROBOT_COORDINATES,
  robotPosition
});

export const parseStateFromText = newInputTextValue => dispatch => {
  const newRoomState = parseInput(newInputTextValue);
  dispatch(inputTextAreaUpdated(newInputTextValue));
  if (newRoomState.isInputValid) {
    dispatch(roomSpecUpdated(newRoomState));
    dispatch(robotSpecUpdated(newRoomState));
    dispatch(
      animateSolvingSequence(
        newRoomState.robotPosition,
        newRoomState.directions
      )
    );
  } else dispatch(incorrectInputPassed(false));
};

const animateSolvingSequence = (robotPosition, directions) => dispatch => {
  const timeoutID = setTimeout(function() {
    if (directions.length > 0) {
      const nextDirection = directions[0];
      switch (nextDirection) {
        case "N":
          dispatch(triggerNavigationNorth());
          break;
        case "S":
          dispatch(triggerNavigationSouth());
          break;
        case "W":
          dispatch(triggerNavigationWest());
          break;
        case "E":
          dispatch(triggerNavigationEast());
          break;
        default:
      }
    }
  }, 1000);
};

const parseInput = textinput => {
  if (validateTextInput(textinput)) {
    const inputLines = textinput.split("\n");

    return {
      roomSize: inputLines[0].split(" ").map(num => +num),
      robotPosition: inputLines[1].split(" ").map(num => +num),
      directions: inputLines[inputLines.length - 1].split(""),
      dirtPatches: inputLines
        .slice(2, inputLines.length - 1)
        .map(line => line.split(" ").map(num => +num)),
      isInputValid: true
    };
  } else return { isInputValid: false };
};

const validateTextInput = textinput => {
  //A valid input has at leasat 2 lines with numbers, followed by directions,
  //we also account for different carriage return types and set max digit size
  const inputRegExp = /^([0-9]{1,10} [0-9]{1,10}(\r\n|\n|\r)){2,}([NSWE]+)$/;
  const isMatch = inputRegExp.test(textinput);
  return isMatch;
};

// The fetch is triggered (via thunk) the App componentent when the component
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

//Robot movements
const moveNorth = location => [location[0], location[1] + 1];
const moveSouth = location => [location[0], location[1] - 1];
const moveWest = location => [location[0] - 1, location[1]];
const moveEast = location => [location[0] + 1, location[1]];

// Thunk for robot navigation
const moveRobot = applyRobotMovement => (dispatch, getState) => {
  const currentState = getState();
  const roomSize = currentState.roomConfiguration.roomSize;
  const robotPosition = currentState.robotConfiguration.robotPosition;

  const [robX, robY] = applyRobotMovement(robotPosition);

  if (robX < roomSize[0] && robX >= 0 && robY < roomSize[1] && robY >= 0) {
    dispatch(setRobotCoordinates([robX, robY]));
    dispatch(removeDirtPatch([robX, robY]));
  }
  dispatch(robotPositionUpdated([robX, robY]));
};

export const triggerNavigationNorth = () => moveRobot(moveNorth);
export const triggerNavigationSouth = () => moveRobot(moveSouth);
export const triggerNavigationWest = () => moveRobot(moveWest);
export const triggerNavigationEast = () => moveRobot(moveEast);
