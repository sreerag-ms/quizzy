import React, { useState, useEffect } from "react";

import { Check } from "@bigbinary/neeto-icons";
import { Modal } from "@bigbinary/neetoui/v2";
import { Form } from "formik";
import { Formik } from "formik";
import propTypes from "prop-types";
import { isEmpty } from "ramda";

import {
  ModalPrimaryButton,
  ModalSecondaryButton,
} from "components/Common/Buttons";

import Option from "./Fields/Option";
import Question from "./Fields/Question";

const QuestionForm = ({
  setShowAddQuestionModal,
  handleSubmit,
  question: existingValues = {},
}) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState(0);

  const [deletedOptions, setDeletedOptions] = useState([]);
  let defaultQuestion = {
    description: "",
    options: [
      { name: "", is_correct: false },
      { name: "", is_correct: false },
    ],
  };
  if (!isEmpty(existingValues)) defaultQuestion = existingValues;

  const handleFormSubmit = () => {
    const resultOptions = options.map((option, index) => ({
      ...option,
      name: option.name.trim(),
      is_correct: index === answer,
    }));

    const result = {
      description: question.trim(),
      options_attributes: [...resultOptions, ...deletedOptions],
    };
    handleSubmit(result);
  };

  // Option validator
  // eslint-disable-next-line consistent-return
  const validateOption = value => {
    if (!value.trim()) {
      return "Required";
    } else if (value.length > 50) {
      return "Max 50 characters";
    }
  };

  // Question validator
  // eslint-disable-next-line consistent-return
  const validateQuestion = value => {
    if (!value.trim()) {
      return "Required";
    } else if (value.length > 500) {
      return "Max 500 characters";
    } else if (value.length < 2) {
      return "Min 2 characters";
    }
  };

  const validateForm = () => {
    const errors = {};
    const questionError = validateQuestion(question);
    if (questionError) {
      errors.question = questionError;
    }
    options.forEach((value, index) => {
      const optError = validateOption(value.name);
      if (optError) {
        errors[index] = optError;
      }
    });
    return errors;
  };

  // Initializes form state according to
  const initFormState = () => {
    const options = [];
    defaultQuestion.options.forEach((option, index) => {
      options.push(option);
      if (option.is_correct) {
        setAnswer(index);
      }
    });
    setOptions(options);
    setQuestion(defaultQuestion.description);
  };

  // Option addition handler
  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, { name: "" }]);
    }
  };

  // Option deletion handler
  const removeOption = index => {
    // If removed option is there in db
    if (options[index].id) {
      setDeletedOptions([
        { ...options[index], is_correct: false, _destroy: true },
        ...deletedOptions,
      ]);
    }

    if (index === answer) {
      setAnswer(0);
    }
    const opt = [...options];
    opt.splice(index, 1);
    setOptions(opt);
  };

  // Init State
  useEffect(() => {
    initFormState();
  }, []);

  return (
    <Formik
      initialValues={{}}
      onSubmit={handleFormSubmit}
      validateOnBlur={false}
      validateOnChange={false}
      validate={validateForm}
    >
      {({ errors, isSubmitting }) => (
        <Form>
          <div>
            <Modal.Header></Modal.Header>
            <Modal.Body className="w-full">
              <div className="w-full py-4">
                <div className="font-xl font-semibold text-gray-600 my-2">
                  Question Description
                </div>

                <Question
                  label=""
                  name="question"
                  rows="6"
                  value={question}
                  setQuestion={setQuestion}
                  error={errors.question}
                  placeholder="Add a question here"
                  required
                />

                <div className="font-xl h-10 font-semibold text-gray-600 mt-3 flex flex-row justify-between items-center">
                  <div> Options </div>
                  <div className="flex flex-row items-center">
                    correct answer -
                    <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center cursor-pointer bg-green-500 ml-2">
                      <Check className="text-white" />
                    </div>
                  </div>
                </div>
                {options.map((option, index) => (
                  <Option
                    error={errors[index]}
                    key={index}
                    checked={index == answer}
                    setAnswer={setAnswer}
                    removeOption={removeOption}
                    index={index}
                    options={options}
                    setOptions={setOptions}
                  />
                ))}
                {options.length < 4 && (
                  <button
                    type="button"
                    onClick={addOption}
                    className="font-semibold text-gray-500 hover:underline"
                  >
                    Add Option
                  </button>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer className="space-x-2">
              <ModalPrimaryButton
                type="submit"
                isSubmitting={isSubmitting}
                label="Save"
              />
              <ModalSecondaryButton
                handleClick={() => setShowAddQuestionModal(false)}
              />
            </Modal.Footer>
          </div>
        </Form>
      )}
    </Formik>
  );
};

QuestionForm.propTypes = {
  setShowAddQuestionModal: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  question: propTypes.object,
};

export default QuestionForm;
