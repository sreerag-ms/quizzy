import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import publicApis from "apis/public";

const AttendQuiz = () => {
  const { slug } = useParams();
  const [quiz, setQuiz] = useState({});
  const fetchQuiz = async () => {
    try {
      const { data } = await publicApis.getQuiz(slug);
      setQuiz(data);
    } catch (err) {
      logger.error(err);
    }
  };
  useEffect(() => {
    fetchQuiz();
  }, []);

  return <div>{quiz.name ?? ""} Under construction</div>;
};

export default AttendQuiz;
