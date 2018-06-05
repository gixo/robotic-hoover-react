import React from "react";
import PropTypes from "prop-types";

const RoomSpec = ({ textValue, onChange, disabled }) => (
  <textarea disabled={disabled} onChange={onChange} value={textValue} />
);

RoomSpec.propTypes = {
  textValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default RoomSpec;
