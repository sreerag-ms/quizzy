import axios from "axios";

const generate = () => axios.get(`/reports/generate`);
const download = fileName =>
  axios.get(`/reports/download/${fileName}`, { responseType: "blob" });
const reportsApi = {
  generate,
  download,
};

export default reportsApi;
