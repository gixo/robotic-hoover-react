import React from "react";
import PropTypes from "prop-types";

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

RoomOutput.propTypes = {
  robotPosition: PropTypes.arrayOf(PropTypes.number.isRequired),
  removedDirtPatchesCount: PropTypes.number.isRequired
};

export default RoomOutput;
