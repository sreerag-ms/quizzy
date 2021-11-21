import axios from "axios";

import { getFromSessionStorage } from "../helpers/sessionStorage";

export const publicInstance = axios.create({
  baseURL: "/public",
});

export const setPublicHeaders = () => {
  publicInstance.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content"),
  };
  const token = getFromSessionStorage("authToken");
  const email = getFromSessionStorage("authEmail");
  if (token && email) {
    publicInstance.defaults.headers["X-Auth-Email"] = email;
    publicInstance.defaults.headers["X-Auth-Token"] = token;
  }
};
export const deletePublicHeaders = () => {
  delete publicInstance.defaults.headers["X-Auth-Email"];
  delete publicInstance.defaults.headers["X-Auth-Token"];
};
