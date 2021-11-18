import React from "react";

import { Modal } from "@bigbinary/neetoui/v2";
import { Input as FormikInput } from "@bigbinary/neetoui/v2/formik";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";

import quizApi from "apis/quiz";
import validationSchema from "constants/formSchema";

import { ModalPrimaryButton, ModalSecondaryButton } from "../Common/Buttons";

const QuizNameModal = ({
  showQuizNameModal,
  setShowQuizNameModal,
  selectedQuiz,
  fetchQuizList,
}) => {
  const quizCreateMode = !selectedQuiz?.name;

  const handleSubmit = async values => {
    try {
      if (quizCreateMode) {
        await quizApi.create(values);
      } else {
        await quizApi.update({
          ...selectedQuiz,
          name: values.name,
        });
      }
    } catch (error) {
      logger.error(error);
    }
    setShowQuizNameModal(false);
    fetchQuizList();
  };

  return (
    <Modal
      size="md"
      isOpen={showQuizNameModal}
      onClose={() => setShowQuizNameModal(false)}
    >
      <Formik
        initialValues={{
          name: selectedQuiz?.name ?? "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema.quizName}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Modal.Header>
                <div className="text-2xl font-semibold">
                  {quizCreateMode
                    ? "Add a name for your quiz"
                    : "Edit quiz name"}
                </div>
              </Modal.Header>
              <Modal.Body className="w-full">
                <div className="w-full py-4">
                  <FormikInput
                    id="name"
                    name="name"
                    placeholder="Enter Name"
                    autoFocus
                  />
                </div>
              </Modal.Body>
              <Modal.Footer className="space-x-2">
                <ModalPrimaryButton
                  type="submit"
                  isSubmitting={isSubmitting}
                  label={quizCreateMode ? "Create quiz" : "Rename"}
                />
                <ModalSecondaryButton
                  handleClick={() => setShowQuizNameModal(false)}
                />
              </Modal.Footer>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
QuizNameModal.propTypes = {
  showQuizNameModal: PropTypes.bool.isRequired,
  setShowQuizNameModal: PropTypes.func.isRequired,
  selectedQuiz: PropTypes.object.isRequired,
  fetchQuizList: PropTypes.func.isRequired,
};

export default QuizNameModal;
