import React from "react";

import { Delete, Check } from "@bigbinary/neeto-icons";
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
    options[index].name = e.target.value || "";
    setOptions([...options]);
  };

  return (
    <div
      className={`flex flex-row justify-between relative ${
        checked && "bg-green-200"
      } items-center w-full my-2 px-2 py-4 rounded-md `}
    >
      <div
        onClick={() => setAnswer(index)}
        className={`w-8 h-8 rounded-full border-2 ml-2 border-gray-600 mr-2 flex items-center justify-center cursor-pointer ${
          checked && "bg-green-500"
        }`}
      >
        <Check className="text-white" />
      </div>

      <input
        name={index.toString()}
        className={`w-11/12 border px-2  rounded-md h-10 ${
          error ? "border-red-300" : "border-gray-300"
        }`}
        placeholder={error && "Please enter a valid option"}
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
