import React from "react";

import PropTypes from "prop-types";

import Option from "./Option";

function Question({ question, index, handleChange = null }) {
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
            // Handlechange null for Results page. used to identify results page
            handleChange={handleChange}
            index={index}
            checked={
              handleChange
                ? question.selectedOption === option.id
                : question.marked === option.id
            }
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
