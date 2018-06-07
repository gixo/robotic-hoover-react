import * as types from "../../src/actions/ActionTypes";

describe("Action Types", () => {
  test("All action types should have different values", () => {
    const values = Object.values(types);
    const valueSet = new Set(values);
    expect(values.length).toEqual(valueSet.size);
  });

  test("Action keys and values should match", () => {
    Object.keys(types).forEach(actionType => {
      expect(types[actionType]).toEqual(actionType);
    });
  });
});
