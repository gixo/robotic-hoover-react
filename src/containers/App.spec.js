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
    dirtLocations: [[1, 1], [2, 2]],
    robotPosition: [0, 0],
    directions: ["N", "S", "W", "E", "E"],
    isInputValid: true,
    hasCompletedAnimation: true,
    removedDirtCount: 0,
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
      const { enzymeWrapper } = setup();
      const roomSpecProps = enzymeWrapper.find("RoomSpec").props();
      const roomVizProps = enzymeWrapper.find("RoomViz").props();
      const resultOutputProps = enzymeWrapper.find("ResultOutput").props();
      const appProps = enzymeWrapper.props();

      expect(appProps.isFetching).toBe(true);
      expect(roomSpecProps.disabled).toBe(true);
      expect(roomVizProps.hasCompletedAnimation).toBe(true);
      expect(resultOutputProps.removedDirtCount).toBe(0);
    });

    it("Fires onchange correctly", () => {
      const { enzymeWrapper } = setup();
      const event = { target: { value: "" } };
      jest.resetAllMocks();

      expect(
        enzymeWrapper
          .find("RoomSpec")
          .find("textarea")
          .simulate("change", event)
      );
    });
  });
});
