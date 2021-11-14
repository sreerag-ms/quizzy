import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { isEmpty } from "ramda";

import quizApi from "apis/quiz";
import { AddButton } from "components/Common/Buttons";
import Wrapper from "components/Common/Wrapper";

import DeletePrompt from "./DeletePromptModal";
import QuizNameModal from "./QuizNameModal";
import QuizTable from "./QuizTable";

const Home = () => {
  const [quizList, setQuizList] = useState([]);
  const [showQuizNameModal, setShowQuizNameModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [loading, setLoading] = useState(true);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const handleNewQuizCLick = () => {
    setSelectedQuiz({});
    setShowQuizNameModal(true);
  };
  const initQuizList = async () => {
    try {
      const response = await quizApi.all();

      if (!isEmpty(response.data)) {
        setQuizList(response.data);
      } else {
        setQuizList([]);
      }
    } catch (err) {
      logger.error(err);
    }
    setLoading(false);
  };
  const generateTableData = () => {
    const tableData = quizList.map(quiz => {
      return {
        name: quiz.name,
        id: quiz.id,
      };
    });
    return tableData;
  };
  useEffect(() => {
    initQuizList();
    return () => {};
  }, []);
  if (loading) {
    return <PageLoader />;
  }

  return (
    <Wrapper>
      <div className={"h-full w-full flex flex-col  pt-6 "}>
        <div className="flex flex-row justify-between h-16 items-center my-4">
          <div className="text-left text-3xl font-bold">
            {isEmpty(quizList) ? "" : "List of Quizzes"}
          </div>
          <div className="flex flex-row flex-wrap ">
            <AddButton handleClick={handleNewQuizCLick} label="+ Add Quiz" />
          </div>
        </div>
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
      </div>
      <QuizNameModal
        showQuizNameModal={showQuizNameModal}
        setShowQuizNameModal={setShowQuizNameModal}
        selectedQuiz={selectedQuiz}
        fetchQuizList={initQuizList}
      />
      <DeletePrompt
        showDeletePrompt={showDeletePrompt}
        setShowDeletePrompt={setShowDeletePrompt}
        selectedQuiz={selectedQuiz}
        setSelectedQuiz={setSelectedQuiz}
        fetchQuizList={initQuizList}
      />
    </Wrapper>
  );
};

export default Home;
