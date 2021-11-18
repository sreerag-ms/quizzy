/* eslint-disable no-unused-vars */
import React from "react";

import { Edit, Close } from "@bigbinary/neeto-icons";

import questionApis from "apis/question";

import Option from "./Option";

const ListItem = ({
  question,
  index,
  setCurrentQuestion,
  setShowAddQuestionModal,
  fetchQuiz,
}) => {
  const onEditClick = () => {
    setCurrentQuestion(question);
    setShowAddQuestionModal(true);
    fetchQuiz();
  };
  const onDeleteClick = async () => {
    try {
      await questionApis.destroy(question.id);
      fetchQuiz();
    } catch (err) {
      logger.error(err);
    }
  };
  return (
    <div className="my-4 w-full shadow-questionBox rounded-md p-4">
      <div className=" font-medium text-lg py-3 flex flex-row justify-between">
        <div className="flex flex-row">
          <div className="font-thin mr-3">{index + 1 + "."}</div>
          <div>{question.description}</div>
        </div>
        <div className="flex flex-row items-center font-normal text-gray-500">
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

export default ListItem;
