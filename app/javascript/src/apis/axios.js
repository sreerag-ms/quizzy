import axios from "axios";

import Toastr from "components/Common/Toastr";
import { setToLocalStorage, getFromLocalStorage } from "helpers/localStorage";

axios.defaults.baseURL = "/";
const DEFAULT_ERROR_MESSAGE = "Something went wrong!";

const handleSuccessResponse = response => {
  if (response?.data?.notice ?? "") {
    Toastr.success(response.data.notice);
  }

  return response;
};

const handleErrorResponse = axiosErrorObject => {
  // Check for failed user authentication
  if (axiosErrorObject.response?.status === 401) {
    setToLocalStorage({ authToken: null, email: null, userId: null });
    if (!window.location.pathname.startsWith("/public/quiz/")) {
      setTimeout(() => (window.location.href = "/"), 2000);
    }
  }
  Toastr.error(
    axiosErrorObject.response?.data?.error ||
      axiosErrorObject.response?.data?.notice ||
      DEFAULT_ERROR_MESSAGE
  );

  // Check for Resource locked error (423)
  if (axiosErrorObject.response?.status === 423) {
    window.location.href = "/";
  }

  return Promise.reject(axiosErrorObject);
};

export const registerIntercepts = () => {
  axios.interceptors.response.use(handleSuccessResponse, handleErrorResponse);
};

export const setAuthHeaders = (setLoading = () => null) => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
  const token = getFromLocalStorage("authToken");
  const email = getFromLocalStorage("authEmail");
  if (token && email) {
    axios.defaults.headers["X-Auth-Email"] = email;
    axios.defaults.headers["X-Auth-Token"] = token;
  }
  setLoading(false);
};

export const deleteAuthHeaders = () => {
  delete axios.defaults.headers["X-Auth-Email"];
  delete axios.defaults.headers["X-Auth-Token"];
};
