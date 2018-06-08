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

  it("Should handle ROBOT_NAV_STEP_COMPLETED", () => {
    expect(
      robotConfiguration(
        {},
        {
          type: types.ROBOT_NAV_STEP_COMPLETED,
          directions: ["N", "S"]
        }
      )
    ).toEqual({ directions: ["S"], timeoutID: undefined });
  });

  it("Should ROBOT_SPEC_UPDATED", () => {
    expect(
      robotConfiguration(
        { newRoomState: { robotPosition: [2, 2], dirtLocations: [[1, 1]] } },
        {
          type: types.ROBOT_SPEC_UPDATED,
          newRoomState: {
            robotPosition: [2, 2],
            dirtLocations: [[1, 1]],
            directions: ["N"]
          }
        }
      )
    ).toEqual({
      directions: ["N"],
      dirtLocations: [[1, 1]],
      newRoomState: { dirtLocations: [[1, 1]], robotPosition: [2, 2] },
      removedDirtCount: 0,
      robotPosition: [2, 2]
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
