import axios from "axios";

const all = () => axios.get(`/attempts`);

const attemptApi = {
  all,
};

export default attemptApi;
