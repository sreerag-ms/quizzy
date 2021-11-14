import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import isEmpty from "ramda/src/isEmpty";
import { useParams } from "react-router-dom";

import quizApi from "apis/quiz";

import AddQuestion from "./AddQuestion";
import QuestionList from "./QuestionList";

import { AddButton } from "../Common/Buttons";
import Wrapper from "../Common/Wrapper";

const ShowQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const fetchQuiz = async () => {
    try {
      const { data } = await quizApi.show(id);
      setQuiz(data ?? {});
    } catch (error) {
      logger.error(error);
    }
    setLoading(false);
  };

  const handleAddQuestion = () => {
    setShowAddQuestionModal(true);
  };
  const handlePublish = async () => {
    try {
      if (quiz.slug) {
        await quizApi.publish({ id: quiz.id, publish: false });
      } else {
        await quizApi.publish({ id: quiz.id, publish: true });
      }
      fetchQuiz();
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <Wrapper>
      <div className={"h-full w-full flex flex-col  pt-6 "}>
        <div className="flex flex-row justify-between h-16 items-center my-6">
          <div className="text-left text-2xl font-semibold">{quiz.name}</div>
          <div className="flex flex-row">
            <AddButton handleClick={handleAddQuestion} label="+ Add Question" />
            <AddButton
              handleClick={handlePublish}
              label={`${quiz.slug ? "Unpublish" : "Publish"}`}
            />
          </div>
        </div>
        {isEmpty(quiz?.questions) ? (
          <div className=" flex justify-center items-center  h-full w-full">
            <div className="h-20 text-gray-400"> No Questions found</div>
          </div>
        ) : (
          <QuestionList
            setCurrentQuestion={setCurrentQuestion}
            quiz={quiz}
            setShowAddQuestionModal={setShowAddQuestionModal}
            fetchQuiz={fetchQuiz}
          />
        )}
      </div>
      <AddQuestion
        showAddQuestionModal={showAddQuestionModal}
        setShowAddQuestionModal={setShowAddQuestionModal}
        quiz={quiz}
        question={currentQuestion}
        fetchQuiz={fetchQuiz}
        setCurrentQuestion={setCurrentQuestion}
      />
    </Wrapper>
  );
};

export default ShowQuiz;
