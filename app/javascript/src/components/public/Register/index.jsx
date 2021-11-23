import React from "react";

import { Modal } from "@bigbinary/neetoui/v2";
import PropTypes from "prop-types";

import publicApis from "apis/public";
import { setPublicHeaders } from "apis/publicHeaders";

import RegisterForm from "./Form";

import { setToSessionStorage } from "../../../helpers/sessionStorage";

const Register = ({
  showRegisterModal,
  setShowRegisterModal,
  fetchQuiz,
  slug,
}) => {
  const handleSubmit = async ({ email, first_name, last_name }) => {
    try {
      const { data } = await publicApis.register({
        user: {
          email: email.trim().toLowerCase(),
          first_name: first_name.trim(),
          last_name: last_name.trim(),
        },
        slug,
      });
      setToSessionStorage({
        authToken: data.authentication_token,
        authEmail: data.email,
        userName: data.first_name + " " + data.last_name,
      });
      setPublicHeaders();
      setShowRegisterModal(false);
      fetchQuiz();
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
Register.propTypes = {
  showRegisterModal: PropTypes.bool.isRequired,
  setShowRegisterModal: PropTypes.func.isRequired,
  fetchQuiz: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
};
export default Register;
