import React from "react";
import PropTypes from "prop-types";

const RoomSpec = ({ value, onChange, disabled }) => (
  <textarea disabled={disabled} onChange={onChange} value={value} />
);

RoomSpec.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default RoomSpec;
