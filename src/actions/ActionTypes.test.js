import * as types from "./ActionTypes";

describe("ActionTypes", () => {
  test("All action types have different values", () => {
    const values = Object.values(types);
    const valueSet = new Set(values);
    expect(values.length).toEqual(valueSet.size);
  });

  test("Object key and values are the same", () => {
    for (let actionType of Object.keys(types)) {
      expect(types[actionType]).toEqual(actionType);
    }
  });
});
