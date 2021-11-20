import axios from "axios";

const generate = () => axios.get(`/reports/generate`);
const reportsApi = {
  generate,
};

export default reportsApi;
