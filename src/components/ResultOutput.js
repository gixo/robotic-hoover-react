import React from "react";

const RoomOutput = ({ robotPosition, removedDirtPatchesCount }) => (
  <div>
    <p>Result</p>
    <textarea
      disabled="true"
      value={
        "Robot Position: " +
        robotPosition +
        "\nRemove Count:" +
        removedDirtPatchesCount
      }
    />
  </div>
);

export default RoomOutput;
