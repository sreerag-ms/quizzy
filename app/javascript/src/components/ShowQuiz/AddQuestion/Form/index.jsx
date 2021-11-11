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
import TextArea from "./Fields/TextArea";

const AddQuestionForm = ({
  setShowAddQuestionModal,
  handleSubmit,
  question: existingValues = {},
}) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState(0);

  let startQuestion;
  if (isEmpty(existingValues)) {
    startQuestion = {
      description: "",
      options: [
        { name: "", answer: false },
        { name: "", answer: false },
      ],
    };
  } else startQuestion = existingValues;

  const initialOptions = startQuestion.options.reduce((acc, curr, index) => {
    return { ...acc, [index]: curr.name };
  }, {});

  // Submit form
  const handleFormSubmit = async () => {
    const resultOptions = options.map((option, index) => {
      return {
        name: option,
        answer: index === answer,
      };
    });

    const result = {
      description: question,
      options_attributes: resultOptions,
    };
    await handleSubmit(result);
  };

  // Option validator
  const validateOption = value => (!value ? "Required" : null);

  // Question validator
  const validateQuestion = value => {
    let error;

    if (!value) {
      error = "Required";
    } else if (value.length > 100) {
      error = "Max 100 characters";
    } else if (value.length < 2) {
      error = "Min 2 characters";
    }

    return error;
  };

  // Init form state
  const initFormState = () => {
    let options = [];
    startQuestion.options.forEach((option, index) => {
      options.push(option.name);
      if (option.answer) {
        setAnswer(index);
      }
    });

    setOptions(options);
    setQuestion(startQuestion.description);
  };

  // Option addition handler
  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  // Option deletion handler
  const removeOption = index => {
    if (options.length > 2) {
      if (index === answer) {
        setAnswer(0);
      }
      let opt = [...options];
      opt.splice(index, 1);
      setOptions(opt);
    }
  };

  // Init State
  useEffect(() => {
    initFormState();
  }, []);

  return (
    <Formik
      initialValues={initialOptions}
      onSubmit={handleFormSubmit}
      validateOnBlur={false}
      validateOnChange={false}
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

                <TextArea
                  label=""
                  name="question"
                  rows="6"
                  question={question}
                  setQuestion={setQuestion}
                  validate={validateQuestion}
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
                    name={!!errors[index.toString()]}
                    value={option}
                    key={index}
                    checked={index == answer}
                    onChecked={() => {
                      setAnswer(index);
                    }}
                    removeOption={removeOption}
                    validate={validateOption}
                    index={index}
                    options={options}
                    setOptions={setOptions}
                  />
                ))}
                <a onClick={addOption}>Add Option</a>
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
AddQuestionForm.propTypes = {
  setShowAddQuestionModal: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  question: propTypes.object,
};

export default AddQuestionForm;
