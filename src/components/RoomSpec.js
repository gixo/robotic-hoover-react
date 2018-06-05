import React from "react";
import PropTypes from "prop-types";

const RoomSpec = ({ inputTextValue, onChange, disabled }) => (
  <div>
    <p>Input area:</p>
    <textarea disabled={disabled} onChange={onChange} value={inputTextValue} />
  </div>
);

RoomSpec.propTypes = {
  inputTextValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default RoomSpec;
