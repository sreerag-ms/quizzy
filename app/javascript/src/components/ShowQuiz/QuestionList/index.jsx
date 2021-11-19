import React from "react";

import PropTypes from "prop-types";

import ListItem from "./ListItem";

const QuestionList = ({
  setCurrentQuestion,
  quiz,
  setShowAddQuestionModal,
  fetchQuiz,
  setShowDeletePrompt,
}) => {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-col justify-center items-center">
        {quiz.questions.map((question, index) => (
          <ListItem
            question={question}
            index={index}
            key={index}
            setCurrentQuestion={setCurrentQuestion}
            setShowAddQuestionModal={setShowAddQuestionModal}
            fetchQuiz={fetchQuiz}
            setShowDeletePrompt={setShowDeletePrompt}
          />
        ))}
      </div>
    </div>
  );
};
QuestionList.prototypes = {
  setCurrentQuestion: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired,
  setShowAddQuestionModal: PropTypes.func.isRequired,
  fetchQuiz: PropTypes.func.sRequired,
  setShowDeletePrompt: PropTypes.func.isRequired,
};
export default QuestionList;
