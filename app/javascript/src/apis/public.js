import axios from "axios";

const getQuiz = slug => axios.get(`/public/quizzes/${slug}`);

const publicApis = {
  getQuiz,
};

export default publicApis;
