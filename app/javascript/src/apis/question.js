import axios from "axios";

const create = data => axios.post(`/questions`, data);

const questionApis = { create };
export default questionApis;
