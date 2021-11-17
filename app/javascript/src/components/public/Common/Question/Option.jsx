import React from "react";

import PropTypes from "prop-types";

const Option = ({ option, handleChange, checked, index, markedOption }) => {
  return (
    <div
      className={`flex flex-row ${
        option.answer ? "bg-green-100" : ""
      } h-12 items-center my-1 px-2`}
    >
      <div
        className={`w-6 h-6 rounded-full border-2 mx-4  border-gray-600 flex items-center justify-center cursor-pointer ${
          checked && "bg-green-300 "
        } ${markedOption && "bg-gray-400"}`}
        onClick={() => handleChange(option.id, index)}
      />
      <div>{option.name}</div>
    </div>
  );
};

Option.propTypes = {
  option: PropTypes.object.isRequired,
  handleChange: PropTypes.func,
  checked: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  markedOption: PropTypes.bool.isRequired,
};

export default Option;
