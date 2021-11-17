import React from "react";

import PropTypes from "prop-types";

import Option from "./Option";

function Question({ question, index, handleChange = () => {} }) {
  return (
    <div className="flex flex-col my-4 w-full shadow-questionBox rounded-md p-4">
      <div className=" font-medium text-lg py-3 flex flex-row justify-between">
        <div className="flex flex-row">
          <div className="font-thin mr-3">{index + 1 + "."}</div>
          <div>{question.description}</div>
        </div>
      </div>
      <div className="w-full flex flex-col">
        {question.options.map((option, i) => (
          <Option
            key={i}
            option={option}
            handleChange={handleChange}
            index={index}
            // Selected option is always null in Show results mode
            checked={question.selectedOption === option.id}
            // marked is always false in Attend quiz mode
            isMarkedOption={question.marked === option.id}
          />
        ))}
      </div>
    </div>
  );
}
Question.propTypes = {
  question: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleChange: PropTypes.func,
};

export default Question;
