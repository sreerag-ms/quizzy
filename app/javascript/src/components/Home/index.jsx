import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { isEmpty } from "ramda";

import quizApi from "apis/quiz";
import { AddButton } from "components/Common/Buttons";
import DeletePrompt from "components/Common/DeletePrompt";
import TitleBar from "components/Common/TitleBar";
import Wrapper from "components/Common/Wrapper";

import QuizNameModal from "./QuizNameModal";
import QuizTable from "./QuizTable";

const Home = () => {
  const [quizList, setQuizList] = useState([]);
  const [showQuizNameModal, setShowQuizNameModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [loading, setLoading] = useState(true);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleNewQuizCLick = () => {
    setSelectedQuiz({});
    setShowQuizNameModal(true);
  };
  const initQuizList = async () => {
    try {
      const { data } = await quizApi.all();
      setQuizList(data ?? []);
    } catch (err) {
      logger.error(err);
    }
    setLoading(false);
  };

  const handleDeleteQuiz = async () => {
    setIsDeleting(true);
    try {
      await quizApi.destroy(selectedQuiz.id);
      setSelectedQuiz({});
      initQuizList();
      setShowDeletePrompt(false);
    } catch (err) {
      logger.error(err);
    }
    setIsDeleting(false);
  };
  const handleCancelDelete = () => {
    setSelectedQuiz({});
    setShowDeletePrompt(false);
  };

  const generateTableData = () =>
    quizList.map(quiz => ({
      name: quiz.name,
      id: quiz.id,
    }));

  useEffect(() => {
    initQuizList();
  }, []);
  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Wrapper>
      <TitleBar title={isEmpty(quizList) ? "" : "List of Quizzes"}>
        <AddButton handleClick={handleNewQuizCLick}>+ Add Quiz</AddButton>
      </TitleBar>

      {isEmpty(quizList) ? (
        <div className=" flex justify-center items-center  h-full w-full">
          <div className="h-20 text-gray-400"> No Quizzes found</div>
        </div>
      ) : (
        <QuizTable
          tableData={generateTableData()}
          setSelectedQuiz={setSelectedQuiz}
          setShowQuizNameModal={setShowQuizNameModal}
          setShowDeletePrompt={setShowDeletePrompt}
        />
      )}

      <QuizNameModal
        showQuizNameModal={showQuizNameModal}
        setShowQuizNameModal={setShowQuizNameModal}
        selectedQuiz={selectedQuiz}
        fetchQuizList={initQuizList}
      />
      <DeletePrompt
        showDeletePrompt={showDeletePrompt}
        message="Are you sure you want to delete this Quiz?"
        item={selectedQuiz.name}
        handleDelete={handleDeleteQuiz}
        handleCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />
    </Wrapper>
  );
};

export default Home;
