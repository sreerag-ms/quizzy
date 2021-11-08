import React from "react";

import propTypes from "prop-types";

const DeleteQuiz = ({ setSelectedQuiz, quiz, setShowDeletePrompt }) => {
  const handleClick = () => {
    setSelectedQuiz(quiz);
    setShowDeletePrompt(true);
  };
  return (
    <button
      className="py-2 px-3 bg-red-400"
      type="button"
      onClick={handleClick}
    >
      Delete
    </button>
  );
};
DeleteQuiz.propTypes = {
  setSelectedQuiz: propTypes.func.isRequired,
  quiz: propTypes.object.isRequired,
  setShowDeletePrompt: propTypes.func.isRequired,
};
export default DeleteQuiz;
