import React from "react";

import PropTypes from "prop-types";

const EditNameButton = ({ setSelectedQuiz, setShowQuizNameModal, quiz }) => {
  return (
    <button
      type="button"
      onClick={() => {
        setSelectedQuiz(quiz);
        setShowQuizNameModal(true);
      }}
      className="bg-gray-300 py-2 px-3"
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
