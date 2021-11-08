import React, { useEffect } from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Modal, Button } from "@bigbinary/neetoui/v2";
import { Input as FormikInput } from "@bigbinary/neetoui/v2/formik";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import isEmpty from "ramda/src/isEmpty";

import quizApi from "apis/quiz";
import validationSchema from "constants/formSchema";

const QuizNameModal = ({
  showQuizNameModal,
  setShowQuizNameModal,
  selectedQuiz,
  fetchQuizList,
}) => {
  const setQuizMode = () =>
    isEmpty(selectedQuiz) || (selectedQuiz?.name ?? "") == "";
  let quizCreateMode = setQuizMode();

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
    fetchQuizList();

    setShowQuizNameModal(false);
  };
  useEffect(() => {
    quizCreateMode = setQuizMode();
  }, [selectedQuiz]);

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
                  <FormikInput id="name" name="name" placeholder="Enter Name" />
                </div>
              </Modal.Body>
              <Modal.Footer className="space-x-2">
                <Button
                  icon={Check}
                  type="submit"
                  label={quizCreateMode ? "Create quiz" : "Save changes"}
                  size="large"
                  style="primary"
                  className="ml-2"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                />
                <Button
                  style="text"
                  label="Cancel"
                  onClick={() => setShowQuizNameModal(false)}
                  size="large"
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
