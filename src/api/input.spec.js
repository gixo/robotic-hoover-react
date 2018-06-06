import { parseInput } from "./input";

describe("Input Parser", () => {
  it("It should fail for empty input", () => {
    const parsedFile = parseInput("");
    expect(parsedFile.isInputValid).toEqual(false);
  });

  it("It should succeed for valid input", () => {
    const parsedFile = parseInput("10 10\n1 2\r\n1 0\n2 2\n2 3\nNNENWW");

    expect(parsedFile.isInputValid).toEqual(true);
    expect(parsedFile.directions).toEqual(["N", "N", "E", "N", "W", "W"]);
  });
});
