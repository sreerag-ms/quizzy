import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import publicApis from "apis/public";
import Wrapper from "components/Common/Wrapper";

import AttendForm from "./Form";

const AttendQuiz = () => {
  const { slug } = useParams();
  const history = useHistory();
  const [quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchQuiz = async () => {
    try {
      const { data } = await publicApis.getQuiz(slug);
      setQuiz(data);
    } catch (err) {
      // Detecting unauthorized error
      if (err.response.status === 401) {
        history.push(`/public/quiz/${slug}`);
      } else if (err.response.status === 403) {
        history.push(`/public/quiz/${slug}/result`);
      } else {
        history.push("/");
      }
    }
    setLoading(false);
  };

  const onCompleteSubmission = () => {
    history.push(`/public/quiz/${slug}/result`);
  };
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

  return (
    <Wrapper>
      <AttendForm quiz={quiz} onSubmit={onCompleteSubmission} />
      <div className="flex items-center justify-center w-full"></div>
    </Wrapper>
  );
};

export default AttendQuiz;
