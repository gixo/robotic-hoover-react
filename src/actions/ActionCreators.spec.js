import * as types from "./ActionTypes";
import * as actions from "./ActionCreators";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import expect, { createSpy } from "expect";

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

  it("Should create an action for incorrect input passed", () => {
    const expectedAction = {
      errorMessage: "error",
      isInputValid: false,
      type: types.INCORRECT_INPUT_PASSED
    };
    expect(actions.incorrectInputPassed(false, "error")).toEqual(
      expectedAction
    );
  });

  it("Should create an action to request input file", () => {
    const inputValue = "2 2\n1 1\nNN";
    const expectedAction = {
      type: types.RECEIVE_INPUT_FILE,
      inputTextValue: inputValue
    };
    expect(actions.receiveInputFile(inputValue)).toEqual(expectedAction);
  });

  it("Should process correct input file", () => {
    const inputValue = "2 2\n1 1\nNN";
    const store = mockStore({
      roomConfiguration: {
        roomSize: [5, 5]
      },
      robotConfiguration: {
        robotPosition: [1, 1],
        directions: ["N", "W"],
        dirtLocations: [[1, 2], [2, 2]]
      }
    });

    const expectedActions = [
      types.INPUT_TEXT_AREA_UPDATED,
      types.ROOM_SPEC_UPDATED,
      types.ROBOT_SPEC_UPDATED,
      types.ROBOT_ANIM_STARTED
    ];

    store.dispatch(actions.parseStateFromText(inputValue));
    const actionsRetrieved = store.getActions().map(action => action.type);

    expect(actionsRetrieved).toEqual(expectedActions);
  });

  it("Should process incorrect input file", () => {
    const inputValue = "2 2\n1 1";
    const store = mockStore({
      roomConfiguration: {
        roomSize: [5, 5]
      },
      robotConfiguration: {
        robotPosition: [1, 1],
        directions: ["N", "W"],
        dirtLocations: [[1, 2], [2, 2]]
      }
    });

    const expectedActions = [
      types.INPUT_TEXT_AREA_UPDATED,
      types.INCORRECT_INPUT_PASSED
    ];

    store.dispatch(actions.parseStateFromText(inputValue));
    const actionsRetrieved = store.getActions().map(action => action.type);

    expect(actionsRetrieved).toEqual(expectedActions);
  });

  it("Should process robot movement", () => {
    let testNav = (
      navigationAction,
      expectedPosition = [1, 1],
      shouldHitWall = false
    ) => {
      //When hitting a wall, the robot shoudn't move after an action
      let initialPosition = [1, 1];
      if (shouldHitWall) initialPosition = expectedPosition;

      const store = mockStore({
        roomConfiguration: {
          roomSize: [5, 5]
        },
        robotConfiguration: {
          robotPosition: initialPosition,
          directions: ["N", "W"],
          dirtLocations: [[1, 2], [2, 2]]
        }
      });

      const expectedActions = [
        types.SET_ROBOT_COORDINATES,
        types.REMOVE_DIRT_PATCH,
        types.ROBOT_NAV_STEP_COMPLETED
      ];

      store.dispatch(navigationAction());
      let returnedActions = store.getActions();

      if (!shouldHitWall) {
        let robotCoordinates = returnedActions.filter(
          action => action.type === types.SET_ROBOT_COORDINATES
        )[0].robotPosition;
        const actionsRetrieved = returnedActions.map(action => action.type);
        expect(actionsRetrieved).toEqual(expectedActions);
        expect(robotCoordinates).toEqual(expectedPosition);
      } else {
        let returnedAction = returnedActions.map(action => action.type);
        expect(returnedAction[0]).toEqual(types.ROBOT_NAV_STEP_COMPLETED);
      }
    };

    //Test typical case navigation
    testNav(actions.triggerNavNorth, [1, 2]);
    testNav(actions.triggerNavSouth, [1, 0]);
    testNav(actions.triggerNavWest, [0, 1]);
    testNav(actions.triggerNavEast, [2, 1]);

    //Test hitting the wall
    testNav(actions.triggerNavNorth, [1, 4], true);
    testNav(actions.triggerNavSouth, [1, 0], true);
    testNav(actions.triggerNavWest, [0, 1], true);
    testNav(actions.triggerNavEast, [4, 1], true);
  });

  it("Start animation solve sequence with directions", () => {
    const store = mockStore({
      roomConfiguration: {
        roomSize: [5, 5]
      },
      robotConfiguration: {
        robotPosition: [1, 1],
        directions: ["N", "W"],
        dirtLocations: [[1, 2], [2, 2]]
      }
    });

    const expectedActions = [
      types.SET_ROBOT_COORDINATES,
      types.REMOVE_DIRT_PATCH,
      types.ROBOT_NAV_STEP_COMPLETED,
      types.ROBOT_ANIM_STARTED,
      types.ROBOT_ANIM_STARTED
    ];

    store.dispatch(actions.animateSolvSeq(false));
    const actionsRetrieved = store.getActions().map(action => action.type);
    expect(actionsRetrieved).toEqual(expectedActions);
  });

  it("Start animation solve sequence with empty directions", () => {
    const store = mockStore({
      roomConfiguration: {
        roomSize: [5, 5]
      },
      robotConfiguration: {
        robotPosition: [1, 1],
        directions: [],
        dirtLocations: [[1, 2], [2, 2]]
      }
    });

    const expectedActions = [types.ROBOT_ANIM_ENDED, types.ROBOT_ANIM_STARTED];

    store.dispatch(actions.animateSolvSeq(false));
    const actionsRetrieved = store.getActions().map(action => action.type);
    expect(actionsRetrieved).toEqual(expectedActions);
  });
});

describe("Should fetch input file", () => {
  it("Should dispatch actions after fetching correct input file", () => {
    const inputFileURL = "input.txt";
    const mockFileInput = "10 10\n2 3\n3 4\nNS";

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

  it("Should dispatch actions after fetching incorrect input file", () => {
    const inputFileURL = "input2.txt";
    const mockFileInput = "10 10\n2 3\n3 4";

    fetchMock.getOnce(inputFileURL, {
      body: mockFileInput,
      headers: { "content-type": "text/plain" }
    });

    const expectedActions = [
      { type: types.REQUEST_INPUT_FILE },
      { type: types.RECEIVE_INPUT_FILE },
      { type: types.INPUT_TEXT_AREA_UPDATED },
      { type: types.INCORRECT_INPUT_PASSED }
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
