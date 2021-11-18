import React from "react";

import { Delete, Check } from "@bigbinary/neeto-icons";
import classNames from "classnames";
import propTypes from "prop-types";

const Option = ({
  index,
  checked = false,
  setAnswer,
  removeOption,
  options,
  setOptions,
  error,
}) => {
  const handleChange = e => {
    const newOptions = [...options];
    newOptions[index].name = e.target.value;
    setOptions(newOptions);
  };

  const optionTabClass = classNames({
    "flex flex-row justify-between relative items-center w-full my-2 px-2 py-4 rounded-md": true,
    "bg-green-200": checked,
  });
  const radioClass = classNames({
    "w-8 h-8 rounded-full border-2 ml-2 border-gray-600 mr-2 flex items-center justify-center cursor-pointer": true,
    "bg-green-500": checked,
  });
  const inputClass = classNames({
    "w-11/12 border px-2  rounded-md h-10 ": true,
    "border-red-300": error,
    "border-gray-300": !error,
  });

  return (
    <div className={optionTabClass}>
      <div onClick={() => setAnswer(index)} className={radioClass}>
        <Check className="text-white" />
      </div>

      <input
        name={index.toString()}
        className={inputClass}
        id={index.toString()}
        onChange={handleChange}
        value={options[index].name}
      />

      {index > 1 && (
        <div
          className="absolute center right-0 mr-3 z-50 rounded-md text-red-300 hover:text-red-600"
          onClick={() => removeOption(index)}
        >
          <Delete />
        </div>
      )}
    </div>
  );
};
Option.propTypes = {
  error: propTypes.string,
  index: propTypes.number,
  checked: propTypes.bool,
  setAnswer: propTypes.func,
  removeOption: propTypes.func,
  options: propTypes.array,
  setOptions: propTypes.func,
};

export default Option;
