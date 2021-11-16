import axios from "axios";

const getQuiz = slug => axios.get(`/public/quizzes/${slug}`);
const register = data => axios.post("/public/users", data);

const publicApis = {
  getQuiz,
  register,
};

export default publicApis;
