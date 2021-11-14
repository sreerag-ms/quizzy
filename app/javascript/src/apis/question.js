import axios from "axios";

const create = data => axios.post(`/questions`, data);
const update = data => axios.put(`/questions/${data.id}`, data);
const destroy = id => axios.delete(`/questions/${id}`);
const questionApis = { create, update, destroy };
export default questionApis;
