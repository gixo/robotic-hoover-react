import * as types from "../actions/ActionTypes";

const initialState = {
  removedDirtPatchesCount: 0,
  dirtPatchesLocations: [],
  robotPosition: [],
  directions: []
};

const robotConfiguration = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ROBOT_COORDINATES:
      return { ...state, robotPosition: action.robotPosition };
    case types.ROBOT_NAVIGATION_STEP_COMPLETED:
      return {
        ...state,
        robotPosition: action.robotPosition,
        directions: action.directions.slice(1)
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
      /*// Find index to remove
      const ix = dirtIndex(state, action);
      if (ix > -1) {
        state = { locations: state.locations.slice(), removed: state.removed };
        state.locations.splice(ix, 1);
        // In setup stage we don't want to increase the removed count
        // whereas in play mode we do
        if (action.count) {
          state.removed++;
        }
      }*/
      return state;
    default:
      return state;
  }
};

export default robotConfiguration;
