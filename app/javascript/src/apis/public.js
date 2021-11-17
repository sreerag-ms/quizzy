import axios from "axios";

const getQuiz = slug => axios.get(`/public/quizzes/${slug}`);
const register = data => axios.post("/public/users", data);
const submitQuiz = data => axios.put(`/public/attempts/${data.id}`, data);

const showAttempt = slug => axios.get(`/public/attempts/${slug}`);
const publicApis = {
  getQuiz,
  register,
  submitQuiz,
  showAttempt,
};

export default publicApis;
