import * as types from "../actions/ActionTypes";

const initialState = {
  removedDirtPatchesCount: 0,
  dirtPatchesLocations: [],
  robotPosition: [],
  directions: [],
  timeoutID: 0
};

const robotConfiguration = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ROBOT_COORDINATES:
      return { ...state, robotPosition: action.robotPosition };
    case types.ROBOT_NAV_STEP_COMPLETED:
      return {
        ...state,
        directions: action.directions.slice(1),
        timeoutID: action.timeoutID
      };
    case types.ROBOT_ANIM_STARTED:
      return {
        ...state,
        timeoutID: action.timeoutID
      };
    case types.ROBOT_SPEC_UPDATED:
      return {
        ...state,
        robotPosition: action.newRoomState.robotPosition,
        removedDirtPatchesCount: 0,
        dirtPatchesLocations: action.newRoomState.dirtPatches,
        directions: action.newRoomState.directions
      };
    case types.REMOVE_DIRT_PATCH:
      const robotLoc = action.robotLocation;
      const dirtPatchesLocations = state.dirtPatchesLocations;
      const newDirtPatches = dirtPatchesLocations.filter(
        patch => !(patch[0] === robotLoc[0] && patch[1] === robotLoc[1])
      );

      return {
        ...state,
        dirtPatchesLocations: newDirtPatches,
        removedDirtPatchesCount: state.removedDirtPatchesCount + 1
      };
    default:
      return state;
  }
};

export default robotConfiguration;
