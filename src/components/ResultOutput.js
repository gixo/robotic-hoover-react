import React from "react";
import PropTypes from "prop-types";

const ResultOutput = ({ robotPosition, removedDirtCount }) => (
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

ResultOutput.propTypes = {
  robotPosition: PropTypes.arrayOf(PropTypes.number.isRequired),
  removedDirtCount: PropTypes.number.isRequired
};

export default ResultOutput;
