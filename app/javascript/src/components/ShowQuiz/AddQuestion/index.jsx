import React from "react";

import { Modal } from "@bigbinary/neetoui/v2";
import PropTypes from "prop-types";
import { isEmpty } from "ramda";

import questionApis from "apis/question";

import QuestionForm from "./Form";

const AddQuestion = ({
  question = {},
  quiz,
  showAddQuestionModal,
  setShowAddQuestionModal,
  fetchQuiz,
  setCurrentQuestion,
}) => {
  /// CreateMode to detect whether user selected a question to edit or create a new one
  const createMode = isEmpty(question);

  const handleSubmit = async values => {
    try {
      if (createMode) {
        await questionApis.create({
          ...values,
          quiz_id: quiz.id,
        });
      } else {
        await questionApis.update({
          ...values,
          quiz_id: quiz.id,
          id: question.id,
        });
      }
    } catch (error) {
      logger.error(error);
    }
    await fetchQuiz();
    setShowAddQuestionModal(false);
    setCurrentQuestion({});
  };

  const onModalClose = () => {
    setShowAddQuestionModal(false);
    setCurrentQuestion({});
  };

  return (
    <Modal
      closeOnOutsideClick={false}
      shouldCloseOnOverlayClick={false}
      size="lg"
      isOpen={showAddQuestionModal}
      onClose={onModalClose}
    >
      <QuestionForm
        handleSubmit={handleSubmit}
        question={question}
        setShowAddQuestionModal={setShowAddQuestionModal}
      />
    </Modal>
  );
};
AddQuestion.propTypes = {
  question: PropTypes.object,
  quiz: PropTypes.object.isRequired,
  showAddQuestionModal: PropTypes.bool.isRequired,
  setShowAddQuestionModal: PropTypes.func.isRequired,
  fetchQuiz: PropTypes.func.isRequired,
  setCurrentQuestion: PropTypes.func.isRequired,
};

export default AddQuestion;
