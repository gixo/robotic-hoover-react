import parseInput from "./input";

describe("Input Parser", () => {
  it("It should fail for empty input", () => {
    const parsedFile = parseInput("");
    debugger;
    expect(parsedFile.isInputValid).toEqual(false);
  });
});
