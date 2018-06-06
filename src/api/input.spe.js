//import configureStore from "redux-mock-store";
//import configureMockStore from "redux-mock-store";
//import thunk from "redux-thunk";

/*const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    ok: true,
    headers: {
      "Content-type": "application/json"
    }
  });
};

const store = mockStore({});

//describe("File Input", () => {
  /*
  test("Correctly parses input file", () => {
    const expectedState = [];
    const parsedInput = parseInput(`5 5
1 2
1 0
2 2
2 3
NNESEESWNWW`);
    expect(parsedInput).toEqual(expectedState);
  });*/
/*
  test("Correctly fetches input file", () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(
        mockResponse(
          200,
          "OK",
          `5 5
1 2
1 0
2 2
2 3
NNESEESWNWW`
        )
      )
    );

    return store.dispatch(fetchPosts("input.txt")).then(() => {
      const expectedActions = store.getActions();
      expect(expectedActions.length).toBe(2);
      /*   expect(expectedActions).toContainEqual({
        type: types.FETCH_DATA_REQUEST
      });
      expect(expectedActions).toContainEqual({
        type: types.FETCH_DATA_SUCCESS,
        data
      });*/
//  });

//   const fetchedFile = fetchPosts("input.txt");
//   expect(fetchedFile).toEqual(fetchedFile);
//});
//});
