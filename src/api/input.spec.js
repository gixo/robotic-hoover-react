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
    let parsedFile = parseInput("10 10\n10 2\r\n1 0\n2 2\n2 3\nNNENWW");
    expect(parsedFile.isInputValid).toEqual(false);

    parsedFile = parseInput("10 10\n1 10\r\n1 0\n2 2\n2 3\nNNENWW");
    expect(parsedFile.isInputValid).toEqual(false);

    parsedFile = parseInput("10 10\n1 1\r\n10 0\n2 2\n2 3\nNNENWW");
    expect(parsedFile.isInputValid).toEqual(false);

    parsedFile = parseInput("10 10\n1 10\r\n1 10\n2 2\n2 3\nNNENWW");
    expect(parsedFile.isInputValid).toEqual(false);
  });

  it("Should not accept overlapping robot and/or dirt patches", () => {
    let parsedFile = parseInput("10 10\n1 1\r\n1 1\n2 2\n2 3\nNNENWW");
    expect(parsedFile.isInputValid).toEqual(false);

    parsedFile = parseInput("10 10\n1 1\r\n2 2\n2 2\n4 4\nNNENWW");
    expect(parsedFile.isInputValid).toEqual(false);
  });

  it("Should not accept empty directions line", () => {
    const parsedFile = parseInput("10 10\n1 1\r\n1 1\n2 2\n2 3");
    expect(parsedFile.isInputValid).toEqual(false);
  });

  it("Should not accept invalid characters in locations", () => {
    const parsedFile = parseInput("10 10\n1.1 1\r\n2 3\n4 5\n6 7\nNNENWW");
    expect(parsedFile.isInputValid).toEqual(false);
  });

  it("Should not accept invalid characters in directions", () => {
    const parsedFile = parseInput("10 10\n1 1\r\n2 3\n4 5\n6 7\nANNENWW");
    expect(parsedFile.isInputValid).toEqual(false);
  });
});
