import robotConfiguration from "./robotConfiguration";
import * as types from "../actions/ActionTypes";

describe("Robot Configuration Reducer", () => {
  it("Should return the initial state", () => {
    expect(robotConfiguration(undefined, {})).toEqual({
      removedDirtPatchesCount: 0,
      dirtPatchesLocations: [],
      robotPosition: [0, 0],
      directions: [],
      timeoutID: 0,
      hasCompletedAnimation: false
    });
  });

  it("Should handle SET_ROBOT_COORDINATES", () => {
    expect(
      robotConfiguration([], {
        type: types.SET_ROBOT_COORDINATES,
        robotPosition: [1, 1]
      })
    ).toEqual({
      robotPosition: [1, 1]
    });
  });

  it("Should REMOVE_DIRT_PATCH", () => {
    /*    expect(
      robotConfiguration([], {
        type: types.REMOVE_DIRT_PATCH,
        robotPosition: [1, 1]
      })
    ).toEqual({ robotPosition: [1, 1] });
*/
  });
});
