import { parseInput } from "./input";

describe("Input Parser", () => {
  it("Should fail for empty input", () => {
    const parsedFile = parseInput("");
    expect(parsedFile.isInputValid).toEqual(false);
  });

  it("Should succeed for valid input", () => {
    const parsedFile = parseInput("10 10\n1 2\r\n1 0\n2 2\n2 3\nNNENWW");

    expect(parsedFile.isInputValid).toEqual(true);
    expect(parsedFile.directions).toEqual(["N", "N", "E", "N", "W", "W"]);
  });

  it("Should not accept dirt or robot location beyond boundaries", () => {
    const parsedFile = parseInput("10 10\n10 2\r\n1 0\n2 2\n2 3\nNNENWW");
    expect(parsedFile.isInputValid).toEqual(false);
  });

  it("Should not accept overlapping robot and/or dirt patches", () => {
    const parsedFile = parseInput("10 10\n1 1\r\n1 1\n2 2\n2 3\nNNENWW");
    expect(parsedFile.isInputValid).toEqual(false);
  });
});
