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

  it("Should REQUEST_INPUT_FILE", () => {
    const config = roomConfiguration(
      { type: types.REQUEST_INPUT_FILE, inputTextValue: "3 3\n4 5" },
      { type: types.REQUEST_INPUT_FILE, inputTextValue: "3 3\n4 5" }
    );
    expect(config).toEqual({
      inputTextValue: "3 3\n4 5",
      type: types.REQUEST_INPUT_FILE
    });
  });

  it("Should RECEIVE_INPUT_FILE", () => {
    const config = roomConfiguration(
      { isFetching: true, roomSize: [5, 5] },
      { type: types.RECEIVE_INPUT_FILE, inputTextValue: "3 3\n4 5" }
    );
    expect(config).toEqual({ isFetching: false, roomSize: [5, 5] });
  });

  it("Should handle INPUT_TEXT_AREA_UPDATED", () => {
    const inputTextValue = "3 3\n4 5";
    expect(
      roomConfiguration([], {
        type: types.INPUT_TEXT_AREA_UPDATED,
        newInputTextValue: "3 3\n4 5"
      }).inputTextValue
    ).toEqual(inputTextValue);
  });

  it("Should handle INCORRECT_INPUT_PASSED", () => {
    expect(
      roomConfiguration([], {
        type: types.INCORRECT_INPUT_PASSED,
        newRoomState: {}
      }).isInputValid
    ).toEqual(false);
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
});
