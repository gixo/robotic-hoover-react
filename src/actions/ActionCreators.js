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

export const robotNavStepCompleted = directions => ({
  type: types.ROBOT_NAV_STEP_COMPLETED,
  directions
});

export const robotAnimStarted = timeoutID => ({
  type: types.ROBOT_ANIM_STARTED,
  timeoutID
});

export const robotAnimEnded = () => ({
  type: types.ROBOT_ANIM_ENDED
});

export const parseStateFromText = newInputTextValue => (dispatch, getState) => {
  const newRoomState = parseInput(newInputTextValue);
  dispatch(inputTextAreaUpdated(newInputTextValue));
  const timeoutID = getState().robotConfiguration.timeoutID;
  clearTimeout(timeoutID);

  if (newRoomState.isInputValid) {
    dispatch(roomSpecUpdated(newRoomState));
    dispatch(robotSpecUpdated(newRoomState));
    dispatch(animateSolvSeq());
  } else dispatch(incorrectInputPassed(false));
};

const animateSolvSeq = () => (dispatch, getState) => {
  const currentState = getState();
  const currentDirections = currentState.robotConfiguration.directions;
  const timeoutID = setTimeout(function() {
    if (currentDirections.length > 0) {
      const nextDirection = currentDirections[0];
      switch (nextDirection) {
        case "N":
          dispatch(triggerNavNorth());
          break;
        case "S":
          dispatch(triggerNavSouth());
          break;
        case "W":
          dispatch(triggerNavWest());
          break;
        case "E":
          dispatch(triggerNavEast());
          break;
        default:
      }
      dispatch(animateSolvSeq());
    } else {
      dispatch(robotAnimEnded());
      console.log(currentState.robotConfiguration.robotPosition.join(" "));
      console.log(currentState.robotConfiguration.removedDirtPatchesCount);
    }
  }, 500);

  dispatch(robotAnimStarted(timeoutID));
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
  const directions = currentState.robotConfiguration.directions;

  const [robX, robY] = applyRobotMovement(robotPosition);

  if (robX < roomSize[0] && robX >= 0 && robY < roomSize[1] && robY >= 0) {
    dispatch(setRobotCoordinates([robX, robY]));
    dispatch(removeDirtPatch([robX, robY]));
  }
  dispatch(robotNavStepCompleted(directions));
};

export const triggerNavNorth = () => moveRobot(moveNorth);
export const triggerNavSouth = () => moveRobot(moveSouth);
export const triggerNavWest = () => moveRobot(moveWest);
export const triggerNavEast = () => moveRobot(moveEast);
