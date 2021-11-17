import React from "react";

import classNames from "classnames";
import PropTypes from "prop-types";

const Question = ({ setQuestion, value, error }) => {
  const questionClass = classNames({
    "border-2 text-area w-full rounded-md": true,
    "border-red-300": error,
  });
  return (
    <div className="flex flex-col">
      <textarea
        rows="5"
        name="question"
        id="question"
        value={value}
        placeholder="Ask me anything"
        className={questionClass}
        onChange={e => setQuestion(e.target.value || "")}
      />
      <div className="text-red-300">{error}</div>
    </div>
  );
};
Question.propTypes = {
  setQuestion: PropTypes.func.isRequired,
  error: PropTypes.string,
  value: PropTypes.string,
};
export default Question;
