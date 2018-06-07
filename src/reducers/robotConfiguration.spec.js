import robotConfiguration from "./robotConfiguration";
import * as types from "../actions/ActionTypes";

describe("Robot Configuration Reducer", () => {
  it("Should return the initial state", () => {
    expect(robotConfiguration(undefined, {})).toEqual({
      removedDirtCount: 0,
      dirtLocations: [],
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
    expect(
      robotConfiguration(
        { dirtLocations: [[1, 1], [2, 2]], removedDirtCount: 1 },
        { type: types.REMOVE_DIRT_PATCH, robotPosition: [1, 1] }
      )
    ).toEqual({
      dirtLocations: [[2, 2]],
      removedDirtCount: 2
    });
  });
});
