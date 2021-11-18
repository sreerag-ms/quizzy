import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import publicApis from "apis/public";

const VerifySlug = () => {
  const { slug } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const fetchQuiz = async () => {
    try {
      await publicApis.verifySlug(slug);
      history.push(`/public/quiz/${slug}/attempts/new`);
    } catch (err) {
      setLoading(false);
    }
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
    <div className="h-screen w-full flex justify-center items-center">
      Requested quiz was not found
    </div>
  );
};

export default VerifySlug;
