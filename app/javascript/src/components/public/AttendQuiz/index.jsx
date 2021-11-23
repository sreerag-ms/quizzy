import React, { useState } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import publicApis from "apis/public";
import Wrapper from "components/Common/Wrapper";

import AttendForm from "./Form";

import Register from "../Register";

const AttendQuiz = () => {
  const { slug } = useParams();
  const history = useHistory();
  const [quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(true);

  const fetchQuiz = async () => {
    try {
      const { data } = await publicApis.getQuiz(slug);
      setQuiz(data);
      setLoading(false);
    } catch (err) {
      switch (err.response.status) {
        // Detecting unauthorized error
        case 401:
          setShowRegisterModal(true);
          break;
        // Detecting forbidden error
        case 403:
          history.push(`/public/quiz/${slug}/result`);
          break;
        // detecting not found error
        case 404:
          history.push(`/public/quiz/${slug}`);
      }
    }
  };

  const onCompleteSubmission = () =>
    history.push(`/public/quiz/${slug}/result`);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
        <Register
          showRegisterModal={showRegisterModal}
          setShowRegisterModal={setShowRegisterModal}
          fetchQuiz={fetchQuiz}
          slug={slug}
        />
      </div>
    );
  }

  return (
    <Wrapper>
      <AttendForm quiz={quiz} onSubmit={onCompleteSubmission} />
    </Wrapper>
  );
};

export default AttendQuiz;
