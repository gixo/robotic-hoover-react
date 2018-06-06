import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { App } from "./App";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    inputFileName: "input.txt",
    inputTextValue: "",
    isFetching: true,
    roomSize: [5, 5],
    dirtPatches: [[1, 1], [2, 2]],
    robotPosition: [0, 0],
    directions: ["N", "S", "W", "E", "E"],
    isInputValid: true,
    hasCompletedAnimation: true,
    removedDirtPatchesCount: 0,
    dispatch: jest.fn()
  };

  const enzymeWrapper = mount(<App {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("App", () => {
    it("Should render Header and subcomponents", () => {
      const { enzymeWrapper } = setup();

      expect(enzymeWrapper.find("header").hasClass("app-header")).toBe(true);
      expect(enzymeWrapper.find("h1").text()).toBe("Robotic Hoover");
    });

    it("Should render RoomSpec and RoomViz", () => {
      const { enzymeWrapper, props } = setup();
      const roomSpecProps = enzymeWrapper.find("RoomSpec").props();
      const roomVizProps = enzymeWrapper.find("RoomViz").props();
      expect(roomSpecProps.disabled).toBe(true);
      expect(roomVizProps.hasCompletedAnimation).toBe(true);
    });
  });
});
