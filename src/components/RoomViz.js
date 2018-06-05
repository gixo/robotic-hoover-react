import React from "react";

const RoomViz = ({ rows = 0, cols = 0, children = 0 }) => (
  <svg viewBox={[0, 1 - rows, cols, rows]} preserveAspectRatio="none">
    {children}
  </svg>
);

export default RoomViz;
