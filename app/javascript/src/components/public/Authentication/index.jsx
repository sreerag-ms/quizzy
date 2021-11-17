import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { Input as FormikInput } from "@bigbinary/neetoui/v2/formik";
import classNames from "classnames";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import publicApis from "apis/public";
import validationSchema from "constants/formSchema";
import { setToLocalStorage } from "helpers/localStorage";

const Register = props => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  const fetchQuiz = async () => {
    try {
      // TODO: Need add a custom slug verification, or pass this via history props
      await publicApis.getQuiz(slug);
      props.history.push(`/public/quiz/${slug}/attempts/new`);
    } catch (err) {
      // Detecting forbidden error
      if (err.response.status === 403) {
        props.history.push(`/public/quiz/${slug}/result`);
      }
      // TODO: Add 404 page
      setLoading(false);
    }
  };
  const handleSubmit = async ({ email, first_name, last_name }) => {
    try {
      const val = {
        email: email.trim().toLowerCase(),
        first_name: first_name.trim(),
        last_name: last_name.trim(),
      };
      const { data } = await publicApis.register(val);
      setToLocalStorage({
        authToken: data.authentication_token,
        email: data.email,
        userName: data.first_name + " " + data.last_name,
      });
      setAuthHeaders();
      window.location.reload();
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchQuiz();
  }, []);
  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
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
          const buttonClass = classNames({
            "px-5 py-3  duration-100 ease-in-out  text-white font-semibold w-full rounded-md": true,
            "bg-gray-300 hover:bg-gray-300": isSubmitting,
            "bg-gray-900 hover:bg-gray-800": !isSubmitting,
          });
          return (
            <div className="w-2/3 max-w-xs">
              <div className="text-2xl my-6 font-semibold text-center">
                Register to continue
              </div>

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
                      className={buttonClass}
                      disabled={isSubmitting}
                    >
                      {!isSubmitting ? "Register" : "Saving.."}
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default Register;
