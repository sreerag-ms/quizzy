import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import isEmpty from "ramda/src/isEmpty";
import { useParams } from "react-router-dom";

import QuestionList from "./QuestionList";

import quizApi from "../../apis/quiz";
import { AddButton } from "../Common/Buttons";
import Wrapper from "../Common/Wrapper";

const ShowQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchQuiz = async () => {
    try {
      const response = await quizApi.show(id);
      setQuiz(response.data);
      logger.info(response);
    } catch (error) {
      logger.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuiz();
  }, []);
  if (loading) return <PageLoader />;

  return (
    <Wrapper>
      <div className={"h-full w-full flex flex-col  pt-6 "}>
        <div className="flex flex-row justify-between h-16 items-center">
          <div className="text-left text-2xl">{quiz.name}</div>
          <div className="flex flex-row flex-wrap ">
            <AddButton handleClick={() => {}} label="+ Add Question" />
          </div>
        </div>
        {isEmpty(quiz?.questionList ?? []) ? (
          <div className=" flex justify-center items-center  h-full w-full">
            <div className="h-20 text-gray-400"> No Questions found</div>
          </div>
        ) : (
          <QuestionList />
        )}
      </div>
    </Wrapper>
  );
};

export default ShowQuiz;
