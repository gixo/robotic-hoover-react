import * as types from "./ActionTypes";
import { parseInput } from "../api/input";
import delay from "timeout-as-promise";

export const requestInputFile = inputFileName => ({
  type: types.REQUEST_INPUT_FILE,
  inputFileName,
  isFetching: true
});

export const receiveInputFile = inputTextValue => ({
  type: types.RECEIVE_INPUT_FILE,
  inputTextValue
});

export const incorrectInputPassed = (isInputValid, errorMessage) => ({
  type: types.INCORRECT_INPUT_PASSED,
  isInputValid,
  errorMessage
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

export const removeDirtPatch = (robotPosition, dirtLocations) => ({
  type: types.REMOVE_DIRT_PATCH,
  robotPosition,
  dirtLocations
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
  } else dispatch(incorrectInputPassed(false, newRoomState.errorMessage));
};

//The timeout delay can be skipped for facilitating testing
export const animateSolvSeq = (useTimeout = true) => (dispatch, getState) => {
  const currentState = getState();
  const currentDirections = currentState.robotConfiguration.directions;

  let timeoutID = 0;
  if (useTimeout) {
    timeoutID = setTimeout(function() {
      executeStep(currentDirections, currentState, dispatch);
    }, 500);
  } else {
    executeStep(currentDirections, currentState, dispatch);
  }

  dispatch(robotAnimStarted(timeoutID));
};

const executeStep = (currentDirections, currentState, dispatch) => {
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
    console.log(currentState.robotConfiguration.removedDirtCount);
  }
};

// The fetch is triggered (via thunk) the App componentent when the component
// is added to the mounted to the DOM
export const fetchInputFile = inputFileURL => dispatch => {
  dispatch(requestInputFile(inputFileURL));

  //Adds a mock delay to simulate network activity
  return delay(200).then(() =>
    fetch(inputFileURL)
      .then(function(response) {
        if (!response.ok) throw Error(response.statusText);
        response.text().then(function(data) {
          dispatch(receiveInputFile(data));
          dispatch(parseStateFromText(data));
        });
      })
      .catch(error => console.log(error))
  );
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
  const dirtLocations = currentState.robotConfiguration.dirtLocations;

  const [robX, robY] = applyRobotMovement(robotPosition);

  if (robX < roomSize[0] && robX >= 0 && robY < roomSize[1] && robY >= 0) {
    dispatch(setRobotCoordinates([robX, robY]));
    dispatch(removeDirtPatch([robX, robY]), dirtLocations);
  }
  dispatch(robotNavStepCompleted(directions));
};

export const triggerNavNorth = () => moveRobot(moveNorth);
export const triggerNavSouth = () => moveRobot(moveSouth);
export const triggerNavWest = () => moveRobot(moveWest);
export const triggerNavEast = () => moveRobot(moveEast);
