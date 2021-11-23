import { publicInstance } from "./publicHeaders";

const getQuiz = slug => publicInstance.get(`/quizzes/${slug}`);
const register = data => publicInstance.post("/attempts", data);
const submitQuiz = data => publicInstance.put(`/attempts/${data.id}`, data);

const showAttempt = slug => publicInstance.get(`/attempts/${slug}`);
const verifySlug = slug =>
  publicInstance.post(`/quizzes/verify_slug`, { slug });
const publicApis = {
  getQuiz,
  register,
  submitQuiz,
  showAttempt,
  verifySlug,
};

export default publicApis;
