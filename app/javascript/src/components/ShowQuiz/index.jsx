import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import isEmpty from "ramda/src/isEmpty";
import { useParams } from "react-router-dom";

import questionApis from "apis/question";
import quizApi from "apis/quiz";

import AddQuestion from "./AddQuestion";
import { CopyUrl, PublishButton } from "./Buttons";
import QuestionList from "./QuestionList";

import { AddButton } from "../Common/Buttons";
import DeletePrompt from "../Common/DeletePrompt";
import Wrapper from "../Common/Wrapper";

const ShowQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [publishButtonLoading, setPublishButtonLoading] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);

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
    setPublishButtonLoading(true);
    try {
      if (quiz.slug) {
        await quizApi.unpublish(quiz.id);
      } else {
        await quizApi.publish(quiz.id);
      }
      fetchQuiz();
    } catch (error) {
      logger.error(error);
    }
    setPublishButtonLoading(false);
  };

  const getUrl = `${window.location.protocol}//${window.location.host}/public/quiz/${quiz.slug}`;

  useEffect(() => {
    fetchQuiz();
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }
  const deleteQuestion = async () => {
    try {
      await questionApis.destroy(currentQuestion.id);
      setShowDeletePrompt(false);
      fetchQuiz();
      setCurrentQuestion({});
    } catch (err) {
      logger.error(err);
    }
  };
  const onCancelDelete = () => {
    setShowDeletePrompt(false);
    setCurrentQuestion({});
  };
  return (
    <Wrapper>
      <div className="h-full w-full flex flex-col  pt-6 ">
        <div className="flex flex-row justify-between h-16 items-center my-6">
          <div className="text-left text-2xl font-semibold">{quiz.name}</div>
          <div className="flex flex-row h-12">
            {quiz.slug && <CopyUrl url={getUrl} />}

            {quiz.questions.length > 0 && (
              <PublishButton
                value={`${quiz.slug ? "Unpublish" : "Publish"}`}
                handleChange={handlePublish}
                loading={publishButtonLoading}
              />
            )}
            <AddButton handleClick={handleAddQuestion} label="+ Add Question" />
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
            setShowDeletePrompt={setShowDeletePrompt}
          />
        )}
      </div>
      <DeletePrompt
        showDeletePrompt={showDeletePrompt}
        item={currentQuestion.description}
        handleDelete={deleteQuestion}
        handleCancel={onCancelDelete}
      />
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
