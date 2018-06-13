import React from "react";
import { shallow, mount } from "enzyme";
import RoomViz from "./RoomViz";

const setup = (
  isInputValid = true,
  hasCompletedAnimation = true,
  roomSize = [5, 5],
  dirtLocations = [[1, 1]],
  robotPosition = [0, 0],
  directions = ["N", "S", ""]
) => {
  const component = shallow(
    <RoomViz
      roomSize={roomSize}
      dirtLocations={dirtLocations}
      robotPosition={robotPosition}
      directions={robotPosition}
      isInputValid={isInputValid}
      hasCompletedAnimation={hasCompletedAnimation}
    />
  );

  return {
    component: component,
    label: component.find("label"),
    svg: component.find("svg"),
    circle: component.find("circle"),
    rect: component.find("rect")
  };
};

describe("RoomViz component", () => {
  it("Should display title", () => {
    const { label } = setup();
    expect(label.text()).toMatch("Room visualization");
  });

  it("Should render svg box complete", () => {
    let { svg } = setup(true, true);
    expect(svg.hasClass("complete")).toBe(true);
  });

  it("Should render svg box valid", () => {
    let { svg } = setup(true, false);
    expect(svg.hasClass("valid")).toBe(true);
  });

  it("Should render svg box error", () => {
    let { svg } = setup(false);
    expect(svg.hasClass("error")).toBe(true);
  });

  it("Should render dirt", () => {
    const { circle } = setup();
    expect(circle.exists()).toBe(true);
  });

  it("Should render robot", () => {
    const { rect } = setup();
    expect(rect.exists()).toBe(true);
  });
});
