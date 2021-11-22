import React from "react";

import classNames from "classnames";

export const AddButton = ({ handleClick, children }) => {
  return (
    <button
      className="px-5 py-3 ml-3 flex items-center bg-gray-300 font-semibold rounded-md"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export const ModalPrimaryButton = ({
  handleClick = async () => {},
  label = "Confirm",
  type = "button",
  isSubmitting = false,
}) => {
  const buttonClasses = classNames({
    "px-5 py-3 duration-100 ease-in-out  text-white font-semibold rounded-md w-32": true,
    "bg-gray-300 hover:bg-gray-300": isSubmitting,
    "bg-gray-900 hover:bg-gray-800": !isSubmitting,
  });
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={isSubmitting}
    >
      {!isSubmitting ? label : "Saving.."}
    </button>
  );
};

export const ModalSecondaryButton = ({ handleClick, label = "Cancel" }) => {
  return (
    <button
      type="button"
      className="px-5 py-3  duration-300 ease-in-out hover:bg-gray-100 font-semibold rounded-md"
      onClick={handleClick}
    >
      {label}
    </button>
  );
};
