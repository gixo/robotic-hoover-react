import React from "react";
import PropTypes from "prop-types";

const RoomSpec = ({ inputTextValue, onChange, disabled }) => (
  <div>
    <label>
      Input area
      <textarea
        disabled={disabled}
        onChange={onChange}
        value={inputTextValue}
      />
    </label>
  </div>
);

RoomSpec.propTypes = {
  inputTextValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default RoomSpec;
