import React from "react";
import PropTypes from "prop-types";

const RoomSpec = ({ inputTextValue, onChange, disabled }) => (
  <textarea disabled={disabled} onChange={onChange} value={inputTextValue} />
);

RoomSpec.propTypes = {
  inputTextValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default RoomSpec;
