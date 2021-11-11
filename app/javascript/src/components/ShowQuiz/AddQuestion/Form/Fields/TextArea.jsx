import React from "react";

import { useField } from "formik";

const TextArea = ({ label, setQuestion, question, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea
        className={`text-area w-full rounded-md border-2 ${
          meta.error && "border-red-300"
        }`}
        onKeyUp={e => {
          setQuestion(e.target.value);
        }}
        {...field}
        {...props}
        defaultValue={question}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-300">{meta.error}</div>
      ) : null}
    </div>
  );
};
export default TextArea;
