import * as Yup from "yup";

export default {
  quizName: Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2, "Name too Short!")
      .max(50, "Name too Long!")
      .required("Add a name to your quiz"),
  }),
  login: Yup.object().shape({
    password: Yup.string().min(6, "Too Short!").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  }),
};
