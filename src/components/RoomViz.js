import React from "react";
//import PropTypes from "prop-types";

import "./RoomViz.css";

const RoomViz = ({
  roomSize = [5, 5],
  dirtPatches = [],
  robotPosition = [0, 0],
  directions = [],
  isInputValid = true,
  hasCompletedAnimation = false
}) => (
  <div>
    <p>Room visualization</p>
    <svg
      className={
        isInputValid ? (hasCompletedAnimation ? "complete" : "valid") : "error"
      }
      viewBox={[0, 1 - roomSize[0], roomSize[1], roomSize[0]]}
      preserveAspectRatio="none"
    >
      <g>
        {dirtPatches.map(([x, y]) => (
          <circle
            key={x + "-" + y}
            cx={+x + 0.5}
            cy={-y + 0.5}
            r="0.5"
            fill="#902222"
            stroke="#711e1e"
            stroke-width="0.05"
          />
        ))}
      </g>
      <g>
        <rect
          x={+robotPosition[0]}
          y={-robotPosition[1]}
          height="1"
          width="1"
          fill="#44446f"
          rx="0.2"
          ry="0.2"
          stroke="#2f2f69"
          stroke-width="0.05"
        />
      </g>
    </svg>
  </div>
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
