import React from "react";

import classNames from "classnames";
import PropTypes from "prop-types";

const Option = ({
  option,
  // Handlechange null only for Results page.
  handleChange,
  checked,
  index,
}) => {
  const optionClass = classNames({
    "flex flex-row h-12 items-center my-1 px-2": true,
    "bg-green-100": option.answer,
  });
  const radioClass = classNames({
    "bg-green-300": checked && handleChange,
    "bg-gray-300": checked && !handleChange,
    "cursor-default": !handleChange,
    "cursor-pointer": handleChange,
    "w-6 h-6 rounded-full border-2 mx-4  border-gray-600 flex items-center justify-center ": true,
  });
  return (
    <div className={optionClass}>
      <div
        className={radioClass}
        onClick={handleChange && (() => handleChange(option.id, index))}
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
};

export default Option;
