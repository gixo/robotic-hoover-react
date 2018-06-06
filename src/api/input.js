const validateTextInput = textinput => {
  //A valid input has at leasat 2 lines with numbers, followed by directions,
  //we also account for different carriage return types and set max digit size
  const inputRegExp = /^([0-9]{1,10} [0-9]{1,10}(\r\n|\n|\r)){2,}([NSWE]+)$/;
  const isMatch = inputRegExp.test(textinput);
  return isMatch;
};

export const parseInput = textinput => {
  if (validateTextInput(textinput)) {
    const inputLines = textinput.split("\n");

    return {
      roomSize: inputLines[0].split(" ").map(num => +num),
      robotPosition: inputLines[1].split(" ").map(num => +num),
      directions: inputLines[inputLines.length - 1].split(""),
      dirtPatches: inputLines
        .slice(2, inputLines.length - 1)
        .map(line => line.split(" ").map(num => +num)),
      isInputValid: true
    };
  } else return { isInputValid: false };
};
