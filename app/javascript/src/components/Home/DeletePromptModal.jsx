import React from "react";

import { Modal } from "@bigbinary/neetoui/v2";
import propTypes from "prop-types";

import quizApi from "apis/quiz";

import { ModalPrimaryButton, ModalSecondaryButton } from "../Common/Buttons";

const DeletePrompt = ({
  showDeletePrompt,
  setShowDeletePrompt,
  selectedQuiz,
  setSelectedQuiz,
  fetchQuizList,
}) => {
  const handleDelete = async () => {
    try {
      await quizApi.destroy(selectedQuiz.id);
      setSelectedQuiz({});
      fetchQuizList();
      setShowDeletePrompt(false);
      return;
    } catch (err) {
      logger.error(err);
      return;
    }
  };
  return (
    <Modal
      size="sm"
      isOpen={showDeletePrompt}
      onClose={() => setShowDeletePrompt(false)}
    >
      <Modal.Header>
        <div className="text-lg font-semibold">
          Are you sure you want to delete the quiz?
        </div>
      </Modal.Header>
      <Modal.Body className="w-full">
        <div className="px-3 py-2 bg-red-100"> {selectedQuiz.name}</div>
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <ModalPrimaryButton handleClick={handleDelete} label="Confirm" />
        <ModalSecondaryButton
          handleClick={() => {
            setSelectedQuiz({});
            setShowDeletePrompt(false);
          }}
          label="Cancel"
        />
      </Modal.Footer>
    </Modal>
  );
};
DeletePrompt.propTypes = {
  showDeletePrompt: propTypes.bool.isRequired,
  setShowDeletePrompt: propTypes.func.isRequired,
  selectedQuiz: propTypes.object.isRequired,
  setSelectedQuiz: propTypes.func.isRequired,
  fetchQuizList: propTypes.func.isRequired,
};
export default DeletePrompt;
