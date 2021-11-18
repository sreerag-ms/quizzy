import React, { useState, useEffect } from "react";

import publicApis from "apis/public";

import Question from "../../Common/Question";

function AttendForm({ quiz, onSubmit }) {
  const [questions, setQuestions] = useState([]);

  const handleSubmit = async () => {
    const responseArray = questions.map(question => ({
      attempt_id: quiz.attempt_id,
      question_id: question.id,
      option_id: question.selectedOption,
    }));

    try {
      await publicApis.submitQuiz({
        id: quiz.attempt_id,
        quiz_id: quiz.id,
        attempt_answers_attributes: responseArray,
      });
      onSubmit();
    } catch (e) {
      logger.error(e);
    }
  };

  const handleChange = (optionId, index) => {
    const newQuestions = [...questions];

    if (newQuestions[index].selectedOption === optionId) {
      newQuestions[index].selectedOption = null;
    } else {
      newQuestions[index].selectedOption = optionId;
    }
    setQuestions(newQuestions);
  };
  const initState = () => {
    const questions = quiz.questions.map(item => ({
      ...item,
      selectedOption: null,
    }));
    setQuestions(questions);
  };
  useEffect(() => {
    initState();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row justify-between mt-10  items-center">
        <div className="text-gray-600 text-2xl font-bold my-6">{quiz.name}</div>

        <button
          className="bg-gray-700 font-bold text-white px-6 py-3 rounded-lg"
          onClick={handleSubmit}
        >
          Submit Quiz
        </button>
      </div>
      {questions.map((question, i) => (
        <Question
          question={question}
          handleChange={handleChange}
          index={i}
          key={i}
        />
      ))}
    </div>
  );
}

export default AttendForm;
