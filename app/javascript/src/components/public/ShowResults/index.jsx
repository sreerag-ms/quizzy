import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import publicApis from "apis/public";
import TitleBar from "components/Common/TitleBar";
import Wrapper from "components/Common/Wrapper";

import Question from "../Common/Question";

const ShowResults = () => {
  const { slug } = useParams();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState({});
  const initState = async () => {
    try {
      const { data } = await publicApis.showAttempt(slug);
      const { questions, ...details } = data;

      setQuestions(questions);
      setQuiz(details);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      if (error.response.status === 401) {
        window.location.href = `/public/quiz/${slug}`;
      }
    }
  };
  useEffect(() => {
    initState();
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
      <TitleBar title={`${quiz.name ?? ""} - Results`}>
        <div className="text-lg font-medium flex flex-row justify-end">
          <div className="px-2 border-r">
            Correct answers :{quiz.correct_answers}
          </div>

          <div className="px-2 ">
            Incorrect answers : {quiz.incorrect_answers}
          </div>
        </div>
      </TitleBar>

      {questions.map((question, index) => (
        <Question question={question} mode={false} index={index} key={index} />
      ))}
    </Wrapper>
  );
};

export default ShowResults;
