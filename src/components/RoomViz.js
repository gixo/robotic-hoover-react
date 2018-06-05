import React from "react";
import PropTypes from "prop-types";

import "./RoomViz.css";

const RoomViz = ({
  roomSize = [],
  dirtPatches = [],
  robotLocation = [],
  directions = []
}) => (
  <svg
    viewBox={[0, 1 - roomSize[0], roomSize[1], roomSize[0]]}
    preserveAspectRatio="none"
  >
    <g>
      {dirtPatches.map(([x, y]) => (
        <rect
          key={x + "-" + y}
          x={+x}
          y={-y}
          height="1"
          width="1"
          fill="green"
        />
      ))}
    </g>
  </svg>
);

/*
RoomViz.propTypes = {
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  dirtLocations: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number.isRequired)
  )
};
*/
export default RoomViz;
