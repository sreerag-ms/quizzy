import React from "react";

import { Modal } from "@bigbinary/neetoui/v2";
import { Input as FormikInput } from "@bigbinary/neetoui/v2/formik";
import classNames from "classnames";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";

import validationSchema from "constants/formSchema";

const RegisterForm = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        email: "",
        first_name: "",
        last_name: "",
      }}
      onSubmit={event => handleSubmit(event)}
      validationSchema={validationSchema.register}
    >
      {({ isSubmitting }) => {
        const buttonClasses = classNames({
          "px-5 py-3 duration-100 ease-in-out  text-white font-semibold w-full rounded-md ": true,
          "bg-gray-900 hover:bg-gray-800": !isSubmitting,
          "bg-gray-300 hover:bg-gray-300": isSubmitting,
        });

        return (
          <div>
            <Modal.Header>
              <div className="text-2xl font-semibold text-center">Register</div>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <div className="w-full flex flex-col flex-wrap font-semibold p-1">
                  <FormikInput
                    className="py-2"
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="someone@example.com"
                  />
                  <FormikInput
                    className="py-2"
                    name="first_name"
                    id="first_name"
                    type="first_name"
                    label="First name"
                    placeholder="Someone"
                  />
                  <FormikInput
                    className="py-2"
                    name="last_name"
                    id="last_name"
                    type="last_name"
                    label="Last name"
                    placeholder=".exe"
                  />
                  <div className="flex flex-col w-full items-center mt-6">
                    <button
                      type="submit"
                      className={buttonClasses}
                      disabled={isSubmitting}
                    >
                      {!isSubmitting ? "Register" : "Saving.."}
                    </button>
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </div>
        );
      }}
    </Formik>
  );
};
RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default RegisterForm;
