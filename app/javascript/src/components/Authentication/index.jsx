import React, { useState } from "react";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import { setToLocalStorage } from "helpers/localStorage";

import LoginForm from "./Form";

const Login = () => {
  const [formLoading, setFormLoading] = useState(false);
  const handleSubmit = async ({ email, password }) => {
    try {
      setFormLoading(true);
      logger.info("User login attempt", email);
      const response = await authApi.login({ login: { email, password } });
      setToLocalStorage({
        authToken: response.data.authentication_token,
        email,
        userName: response.data.first_name + " " + response.data.last_name,
      });
      setAuthHeaders();
      window.location.href = "/";
    } catch (error) {
      setFormLoading(false);
      logger.error(error);
    }
  };
  return (
    <div className="h-full w-full flex justify-center items-center">
      <LoginForm handleSubmit={handleSubmit} formLoading={formLoading} />
    </div>
  );
};

export default Login;
