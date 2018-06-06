import * as types from "./ActionTypes";
import * as actions from "./ActionCreators";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import expect from "expect"; // You can use any testing library

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Action Creators", () => {
  it("Should create an action to request input file", () => {
    const inputFileName = "input.txt";
    const expectedAction = {
      type: types.REQUEST_INPUT_FILE,
      inputFileName,
      isFetching: true
    };
    expect(actions.requestInputFile(inputFileName)).toEqual(expectedAction);
  });

  //todo: add tests for all sync action creators
});

describe("Should fetch input file", () => {
  it("Should dispatch actions after fetching input file", () => {
    const inputFileURL = "input.txt";
    const mockFileInput = "1 1\n2 3\n3 4\nNS";

    fetchMock.getOnce(inputFileURL, {
      body: mockFileInput,
      headers: { "content-type": "text/plain" }
    });

    const expectedActions = [
      {
        type: types.REQUEST_INPUT_FILE,
        inputFileName: inputFileURL
      },
      { type: types.RECEIVE_INPUT_FILE, inputTextValue: mockFileInput },
      { type: types.INPUT_TEXT_AREA_UPDATED, newInputTextValue: mockFileInput },
      { type: types.ROOM_SPEC_UPDATED },
      { type: types.ROBOT_SPEC_UPDATED },
      { type: types.ROBOT_ANIM_STARTED }
    ];

    const store = mockStore({ robotConfiguration: { timeoutID: 0 } });
    return store.dispatch(actions.fetchInputFile(inputFileURL)).then(() => {
      const actionsRetrieved = store.getActions().map(action => action.type);

      expect(actionsRetrieved).toEqual(
        expectedActions.map(action => action.type)
      );
    });
  });
});
