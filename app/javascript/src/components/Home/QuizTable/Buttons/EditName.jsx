import React from "react";

import PropTypes from "prop-types";

const EditNameButton = ({ setSelectedQuiz, setShowQuizNameModal, quiz }) => {
  return (
    <button
      type="button"
      onClick={e => {
        e.stopPropagation();
        setSelectedQuiz(quiz);
        setShowQuizNameModal(true);
      }}
      className="bg-gray-300 py-2 px-3 ml-12 rounded-md"
    >
      Edit
    </button>
  );
};

EditNameButton.propTypes = {
  setSelectedQuiz: PropTypes.func.isRequired,
  setShowQuizNameModal: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired,
};
export default EditNameButton;
