import React from "react";
import PropTypes from "prop-types";

const RoomOutput = ({ robotPosition, removedDirtCount }) => (
  <div>
    <p>Result</p>
    <textarea
      disabled="true"
      value={
        "Robot Position:\n" +
        robotPosition.join(" ") +
        "\n\nPatches removed:\n" +
        removedDirtCount
      }
    />
  </div>
);

RoomOutput.propTypes = {
  robotPosition: PropTypes.arrayOf(PropTypes.number.isRequired),
  removedDirtCount: PropTypes.number.isRequired
};

export default RoomOutput;
