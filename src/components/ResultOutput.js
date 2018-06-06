import React from "react";

const RoomOutput = ({ robotPosition, removedDirtPatchesCount }) => (
  <div>
    <p>Result</p>
    <textarea
      disabled="true"
      value={
        "Robot Position:\n" +
        robotPosition.join(" ") +
        "\n\nPatches removed:\n" +
        removedDirtPatchesCount
      }
    />
  </div>
);

export default RoomOutput;
