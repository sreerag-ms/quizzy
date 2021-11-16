import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import publicApis from "apis/public";
import Wrapper from "components/Common/Wrapper";

import Register from "../Register";

const AttendQuiz = () => {
  const { slug } = useParams();

  const [quiz, setQuiz] = useState({});
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const fetchQuiz = async () => {
    try {
      const { data } = await publicApis.getQuiz(slug);
      setQuiz(data);
      setUserAuthenticated(true);
    } catch (err) {
      if (err.response.status === 401) {
        setUserAuthenticated(false);
        setShowRegisterModal(true);
      }
    }
    setLoading(false);
  };
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
      <div>{quiz.name ?? ""} Under construction</div>
    </Wrapper>
  );
};

export default AttendQuiz;
