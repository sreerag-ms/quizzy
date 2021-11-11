import React from "react";

import { Delete, Check } from "@bigbinary/neeto-icons";
import { Field } from "formik";
import { useFormikContext } from "formik";
import propTypes from "prop-types";

const Option = ({
  errored,
  index,
  checked = false,
  onChecked,
  validate,
  removeOption,
  options,
  setOptions,
}) => {
  const handleChange = e => {
    const opt = options;
    opt[index] = e.target.value;
    setOptions(opt);
  };
  const { setFieldValue } = useFormikContext();

  const onDeleteFormikContext = () => {
    setFieldValue(index.toString(), "");

    // TODO: Better solution, Edge case when non last option is deleted and added again
    if (index == 2) {
      setFieldValue("2", options[3]);
      setFieldValue("3", "");
    }
    removeOption(index);
  };
  return (
    <div
      className={`flex flex-row justify-between relative ${
        checked && "bg-green-200"
      } items-center w-full my-2 px-2 py-4 rounded-md `}
    >
      <div
        onClick={onChecked}
        className={`w-8 h-8 rounded-full border-2 ml-2 border-gray-600 mr-2 flex items-center justify-center cursor-pointer ${
          checked && "bg-green-500"
        }`}
      >
        <Check className="text-white" />
      </div>

      <Field
        name={index.toString()}
        className={`w-11/12 border px-2  rounded-md h-10 ${
          errored ? "border-red-500" : "border-gray-300"
        }`}
        validate={validate}
        id={index}
        onKeyUp={handleChange}
      />

      {index > 1 && (
        <div
          className="absolute center right-0 mr-3 z-50 rounded-md text-red-300 hover:text-red-600"
          onClick={onDeleteFormikContext}
        >
          <Delete />
        </div>
      )}
    </div>
  );
};
Option.propTypes = {
  errored: propTypes.string,
  index: propTypes.number,
  checked: propTypes.bool,
  onChecked: propTypes.func,
  validate: propTypes.func,
  removeOption: propTypes.func,
  options: propTypes.array,
  setOptions: propTypes.func,
};

export default Option;
