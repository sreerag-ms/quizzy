import React from "react";

// eslint-disable-next-line no-unused-vars
import { Button } from "@bigbinary/neetoui/v2";
import { Input as FormikInput } from "@bigbinary/neetoui/v2/formik";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";

import validationSchema from "constants/formSchema";

const LoginForm = ({ handleSubmit, formLoading: loading }) => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="w-2/3 flex flex-col max-w-sm">
        <div className="text-2xl font-semibold text-center">Login</div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={event => handleSubmit(event)}
          validationSchema={validationSchema.login}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="w-full flex flex-col flex-wrap font-semibold p-1">
                <FormikInput
                  className="py-4"
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="Enter Email"
                />

                <FormikInput
                  name="password"
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="****"
                />
                <div className="flex flex-col w-full items-center ">
                  <button
                    className="w-full text-center py-3 rounded-sm font-semibold bg-gray-900 text-gray-100 my-4 duration-300 hover:bg-gray-800"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  formLoading: PropTypes.bool.isRequired,
};

export default LoginForm;
