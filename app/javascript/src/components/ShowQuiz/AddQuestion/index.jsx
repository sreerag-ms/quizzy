import React, { useState } from "react";

import { Modal } from "@bigbinary/neetoui/v2";
import PropTypes from "prop-types";
import { isEmpty } from "ramda";

import questionApis from "apis/question";

import AddQuestionForm from "./Form";

const AddQuestion = ({
  question = {},
  quiz,
  showAddQuestionModal,
  setShowAddQuestionModal,
}) => {
  const createmode = isEmpty(question);
  logger.info("createmode", createmode);
  const handleSubmit = async values => {
    try {
      if (createmode) {
        await questionApis.create({
          ...values,
          quiz_id: quiz.id,
        });
      } else {
        logger.info("update question", values);
      }
    } catch (error) {
      logger.error(error);
    }
    setShowAddQuestionModal(false);
    logger.info(values);
  };
  const [formState, setFormState] = useState({});

  return (
    <Modal
      closeOnOutsideClick={false}
      shouldCloseOnOverlayClick={false}
      size="lg"
      isOpen={showAddQuestionModal}
      onClose={() => setShowAddQuestionModal(false)}
    >
      <AddQuestionForm
        handleSubmit={handleSubmit}
        question={question}
        createmode={createmode}
        setShowAddQuestionModal={setShowAddQuestionModal}
        formState={formState}
        setFormState={setFormState}
      />
    </Modal>
  );
};
AddQuestion.propTypes = {
  question: PropTypes.object,
  quiz: PropTypes.object.isRequired,
  showAddQuestionModal: PropTypes.bool.isRequired,
  setShowAddQuestionModal: PropTypes.func.isRequired,
};

export default AddQuestion;
