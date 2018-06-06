import * as types from "../../src/actions/ActionTypes";

describe("Action Types", () => {
  test("Action types have all different values", () => {
    const values = Object.values(types);
    const valueSet = new Set(values);
    expect(values.length).toEqual(valueSet.size);
  });

  test("Action keys and values match", () => {
    for (let actionType of Object.keys(types)) {
      expect(types[actionType]).toEqual(actionType);
    }
  });
});
