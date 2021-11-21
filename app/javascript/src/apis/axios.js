import axios from "axios";

import Toastr from "components/Common/Toastr";
import { setToLocalStorage } from "helpers/localStorage";

import { setAdminHeaders } from "./adminHeaders";
import { setPublicHeaders, publicInstance } from "./publicHeaders";

import { setToSessionStorage } from "../helpers/sessionStorage";

const DEFAULT_ERROR_MESSAGE = "Something went wrong!";

const handleSuccessResponse = response => {
  if (response?.data?.notice) {
    Toastr.success(response.data.notice);
  }

  return response;
};

const handleAdminErrorResponse = axiosErrorObject => {
  // Check for failed user authentication
  if (axiosErrorObject.response?.status === 401) {
    setToLocalStorage({ authToken: null, email: null, userName: null });
    setTimeout(() => (window.location.href = "/"), 2000);
  }

  // Route to not_found(will route to NotFound page) on Not found or Forbidden errors
  if (
    axiosErrorObject.response?.status === 403 ||
    axiosErrorObject.response?.status === 404
  ) {
    window.location.href = "/not_found";
  }

  Toastr.error(
    axiosErrorObject.response?.data?.error ||
      axiosErrorObject.response?.data?.notice ||
      DEFAULT_ERROR_MESSAGE
  );

  return Promise.reject(axiosErrorObject);
};

const handlePublicErrorResponse = axiosErrorObject => {
  if (axiosErrorObject.response?.status === 401) {
    setToSessionStorage({ authToken: null, email: null, userName: null });
  }

  // No notification on unauthorized error, handled locally in the component
  if (axiosErrorObject.response?.status != 401) {
    Toastr.error(
      axiosErrorObject.response?.data?.error ||
        axiosErrorObject.response?.data?.notice ||
        DEFAULT_ERROR_MESSAGE
    );
  }

  return Promise.reject(axiosErrorObject);
};

export const registerIntercepts = () => {
  axios.interceptors.response.use(
    handleSuccessResponse,
    handleAdminErrorResponse
  );
  publicInstance.interceptors.response.use(
    handleSuccessResponse,
    handlePublicErrorResponse
  );
};

export const setAuthHeaders = (setLoading = () => null) => {
  setAdminHeaders();
  setPublicHeaders();
  setLoading(false);
};
