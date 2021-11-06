import axios from "axios";

const create = data => axios.post(`/quizzes`, data);

const quizApi = {
  create,
};

export default quizApi;
