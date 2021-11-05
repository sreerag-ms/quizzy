import React from "react";

import { toast } from "react-toastify";

import { TOASTR_OPTIONS } from "constants/toastr";

const ToastrComponent = ({ message }) => {
  return (
    <div className="px-4 font-medium text-left leading-5 text-black">
      {message}
    </div>
  );
};

const showToastr = message => {
  toast.success(<ToastrComponent message={message} />, TOASTR_OPTIONS);
};

const isError = e => e && e.stack && e.message;

const showErrorToastr = error => {
  const errorMessage = isError(error) ? error.message : error;
  toast.error(<ToastrComponent message={errorMessage} />, TOASTR_OPTIONS);
};

export const Toastr = {
  success: showToastr,
  error: showErrorToastr,
};

export default Toastr;
