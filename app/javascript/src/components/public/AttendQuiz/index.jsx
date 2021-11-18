import React, { useEffect, useState } from "react";

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
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  const fetchQuiz = async () => {
    try {
      const { data } = await publicApis.getQuiz(slug);
      setQuiz(data);
      setUserAuthenticated(true);
    } catch (err) {
      switch (err.response.status) {
        // Detecting unauthorized error

        case 401:
          setUserAuthenticated(false);
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
    setLoading(false);
  };

  const onCompleteSubmission = () =>
    history.push(`/public/quiz/${slug}/result`);

  useEffect(() => {
    fetchQuiz();
  }, []);

  if (loading || !userAuthenticated) {
    return (
      <div className="h-screen">
        <PageLoader />
        <Register
          showRegisterModal={showRegisterModal}
          setShowRegisterModal={setShowRegisterModal}
        />
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
