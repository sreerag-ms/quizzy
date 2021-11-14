import React from "react";

import PropTypes from "prop-types";

const Question = ({ setQuestion, value, error }) => {
  return (
    <div className="flex flex-col">
      <textarea
        rows="5"
        name="question"
        id="question"
        value={value}
        placeholder="Ask me anything"
        className={`border-2 text-area w-full rounded-md ${
          error ? "border-red-300" : ""
        }`}
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
