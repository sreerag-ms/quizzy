import React from "react";

import { Check } from "@bigbinary/neeto-icons";
import classNames from "classnames";
import PropTypes from "prop-types";

const Option = ({ option, index }) => {
  const { is_correct, name } = option;
  const optionClasses = classNames({
    "flex flex-row p-2 items-center w-full h-12 my-1 ": true,
    "bg-green-200": is_correct,
    "bg-gray-200": !is_correct,
  });
  return (
    <div className={optionClasses}>
      <div className="font-thin">{`Option ${index + 1}. `} </div>
      <div className="font-normal mx-3">{name}</div>
      {is_correct && (
        <div className="text-gray-400 px-6">
          <Check />
        </div>
      )}
    </div>
  );
};

Option.propTypes = {
  option: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
export default Option;
