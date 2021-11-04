import axios from "axios";

const login = params => axios.post("/sessions", params);
const logout = () => axios.delete("/sessions");

const authApi = {
  login,
  logout,
};

export default authApi;
