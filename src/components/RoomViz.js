import React from "react";

const RoomViz = ({ rows, cols, children }) => (
  <svg viewBox={[0, 1 - rows, cols, rows]} preserveAspectRatio="none">
    {children}
  </svg>
);

export default RoomViz;
