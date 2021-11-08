import React from "react";

import { Modal, Button } from "@bigbinary/neetoui/v2";
import propTypes from "prop-types";

import quizApi from "apis/quiz";

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
    } catch (err) {
      logger.error(err);
    }
  };
  return (
    <Modal
      size="sm"
      isOpen={showDeletePrompt}
      onClose={() => setShowDeletePrompt(false)}
    >
      <Modal.Header>
        <div className="text-2xl font-semibold">
          Are you sure you want to delete this?
        </div>
      </Modal.Header>
      <Modal.Body className="w-full"></Modal.Body>
      <Modal.Footer className="space-x-2">
        <Button
          type="button"
          label={"Delete"}
          size="large"
          style="primary"
          className="ml-2"
          onClick={handleDelete}
        />
        <Button
          style="text"
          label="Cancel"
          onClick={() => {
            setSelectedQuiz({});
            setShowDeletePrompt(false);
          }}
          size="large"
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
