import axios from "axios";

const create = data => axios.post(`/quizzes`, data);
const all = () => axios.get(`/quizzes`);
const update = data => {
  return axios.put(`/quizzes/${data.id}`, data);
};
const destroy = id => axios.delete(`/quizzes/${id}`);

const quizApi = {
  create,
  all,
  update,
  destroy,
};

export default quizApi;
