import React, { useState, useEffect } from "react";

import { isEmpty } from "ramda";

import Wrapper from "components/Common/Wrapper";

const Home = () => {
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    setQuizList([]);
    return () => {};
  }, []);
  return (
    <Wrapper>
      <div className={"h-full w-full flex flex-col  pt-6 "}>
        <div className="flex flex-row justify-between h-16 items-center">
          <div className="text-left text-2xl">
            {isEmpty(quizList) ? "" : "List of Quizzes"}
          </div>
          <div className="flex flex-row flex-wrap ">
            <button className="px-5 py-3 bg-gray-300 font-semibold rounded-md">
              + Add New Quiz
            </button>
          </div>
        </div>
        {isEmpty(quizList) ? (
          <div className=" flex justify-center items-center  h-full w-full">
            <div className="h-20 text-gray-400"> No Quizzes found</div>
          </div>
        ) : (
          <div className="flex flex-col w-full bg-gray-300 py-6"></div>
        )}
      </div>
    </Wrapper>
  );
};

export default Home;
