import axios from "axios";

const create = data => axios.post(`/quizzes`, data);
const all = () => axios.get(`/quizzes`);
const update = data => axios.put(`/quizzes/${data.id}`, data);
const destroy = id => axios.delete(`/quizzes/${id}`);
const show = id => axios.get(`/quizzes/${id}`);
const publish = id => axios.post(`/quizzes/${id}/publish`);
const unpublish = id => axios.post(`/quizzes/${id}/unpublish`);

const quizApi = {
  create,
  all,
  update,
  destroy,
  show,
  publish,
  unpublish,
};

export default quizApi;
