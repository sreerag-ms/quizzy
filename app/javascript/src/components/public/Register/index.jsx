import React from "react";

import { Modal } from "@bigbinary/neetoui/v2";

import { setAuthHeaders } from "apis/axios";
import publicApis from "apis/public";
import { setToLocalStorage } from "helpers/localStorage";

import RegisterForm from "./Form";

const Register = ({ showRegisterModal, setShowRegisterModal }) => {
  const handleSubmit = async ({ email, first_name, last_name }) => {
    try {
      const val = {
        email: email.trim().toLowerCase(),
        first_name: first_name.trim(),
        last_name: last_name.trim(),
      };
      const response = await publicApis.register(val);
      setToLocalStorage({
        authToken: response.data.authentication_token,
        email: response.data.email,
        userName: response.data.first_name + " " + response.data.last_name,
        userRole: response.data.role,
      });
      setAuthHeaders();
      window.location.reload();
    } catch (error) {
      logger.error(error);
    }
  };
  return (
    <Modal
      size="sm"
      isOpen={showRegisterModal}
      onClose={() => setShowRegisterModal(false)}
      closeOnOutsideClick={false}
      shouldCloseOnOverlayClick={false}
      closeButton={false}
      closeOnEsc={false}
    >
      <RegisterForm handleSubmit={handleSubmit} />
    </Modal>
  );
};

export default Register;
