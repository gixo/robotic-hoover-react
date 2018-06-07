import roomConfiguration from "./roomConfiguration";
import * as types from "../actions/ActionTypes";

describe("Robot Configuration Reducer", () => {
  it("Should return the initial state", () => {
    expect(roomConfiguration(undefined, {})).toEqual({
      inputFileName: "input.txt",
      isFetching: true,
      inputTextValue: "Loading...",
      roomSize: [5, 5],
      isInputValid: true
    });
  });

  it("Should handle ROOM_SPEC_UPDATED", () => {
    expect(
      roomConfiguration([], {
        type: types.ROOM_SPEC_UPDATED,
        newRoomState: {
          inputFileName: "input.txt",
          isFetching: true,
          inputTextValue: "Loading...",
          roomSize: [5, 5],
          isInputValid: true
        }
      })
    ).toEqual({
      roomSize: [5, 5],
      isInputValid: true
    });
  });

  it("Should RECEIVE_INPUT_FILE", () => {
    const config = roomConfiguration(
      { isFetching: true },
      { type: types.RECEIVE_INPUT_FILE, inputTextValue: "3 3\n4 5" }
    );
    expect(config).toEqual({ isFetching: false });
  });
});
