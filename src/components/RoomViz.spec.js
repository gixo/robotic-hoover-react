import React from "react";
import { shallow } from "enzyme";
import RoomViz from "./RoomViz";

const setup = (
  isInputValid = true,
  roomSize = [5, 5],
  dirtPatches = [[1, 1]],
  robotPosition = [0, 0],
  directions = ["N", "S", ""],
  hasCompletedAnimation = true
) => {
  const component = shallow(
    <RoomViz
      roomSize={roomSize}
      dirtPatches={dirtPatches}
      robotPosition={robotPosition}
      directions={robotPosition}
      isInputValid={isInputValid}
      hasCompletedAnimation={hasCompletedAnimation}
    />
  );

  return {
    component: component,
    p: component.find("p"),
    svg: component.find("svg"),
    circle: component.find("circle"),
    rect: component.find("rect")
  };
};

describe("Cart component", () => {
  it("Should display title", () => {
    const { p } = setup();
    expect(p.text()).toMatch("Room visualization");
  });

  it("Should render svg box valid", () => {
    let { svg } = setup();
    expect(svg.hasClass("complete"));
  });

  it("Should render svg box error", () => {
    let { svg } = setup(false);
    expect(svg.hasClass("error"));
  });

  it("Should render robot", () => {
    const { circle } = setup();
    expect(circle.exists());
  });

  it("Should render robot", () => {
    const { rect } = setup();
    expect(rect.exists());
  });
});
