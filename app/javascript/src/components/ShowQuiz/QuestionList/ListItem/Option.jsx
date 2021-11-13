import React from "react";

import { Check } from "@bigbinary/neeto-icons";
import PropTypes from "prop-types";

const Option = ({ option, index }) => {
  const { answer, name } = option;
  return (
    <div
      className={`flex flex-row p-2 items-center my-1 ${
        answer ? "bg-green-200" : "bg-gray-100"
      } w-full h-12`}
    >
      <div className="font-thin">{`Option ${(index + 1).toString()}. `} </div>{" "}
      <div className="font-normal mx-3">{name}</div>
      {answer && (
        <div className="font-black text-white px-6">
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
