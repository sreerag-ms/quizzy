import React from "react";

import { Edit, Close } from "@bigbinary/neeto-icons";
import PropTypes from "prop-types";

import Toastr from "components/Common/Toastr";

import Option from "./Option";

const ListItem = ({
  question,
  index,
  setCurrentQuestion,
  setShowAddQuestionModal,
  fetchQuiz,
  setShowDeletePrompt,
  disableDelete = false,
}) => {
  const onEditClick = () => {
    setCurrentQuestion(question);
    setShowAddQuestionModal(true);
    fetchQuiz();
  };
  const onDeleteClick = () => {
    if (disableDelete) {
      Toastr.error(
        "Question cannot be deleted,\nUnpublish the quiz to delete the question"
      );
    } else {
      setCurrentQuestion(question);
      setShowDeletePrompt(true);
    }
  };
  return (
    <div className="my-4 w-full shadow-questionBox rounded-md p-4">
      <div className=" font-medium text-lg py-3 flex flex-row justify-between">
        <div>
          <span className="font-thin mr-3">{index + 1 + "."}</span>
          {question.description}
        </div>
        <div className="flex flex-row font-normal text-gray-500">
          <a
            className="ml-2 hover:text-gray-600"
            onClick={onEditClick}
            title="Edit"
          >
            <Edit size="20" />
          </a>
          <a
            className="ml-4 hover:text-red-600"
            onClick={onDeleteClick}
            title="Delete"
          >
            <Close size="20" />
          </a>
        </div>
      </div>
      {question.options.map((option, index) => (
        <Option option={option} index={index} key={index} />
      ))}
    </div>
  );
};
ListItem.propTypes = {
  question: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  setCurrentQuestion: PropTypes.func.isRequired,
  setShowAddQuestionModal: PropTypes.func.isRequired,
  fetchQuiz: PropTypes.func.isRequired,
  setShowDeletePrompt: PropTypes.func.isRequired,
};

export default ListItem;
