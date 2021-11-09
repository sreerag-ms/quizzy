import React, { useState, useEffect } from "react";

export const AddButton = ({ handleClick, label = "Add" }) => {
  return (
    <button
      className="px-5 py-3 bg-gray-300 font-semibold rounded-md"
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export const ModalPrimaryButton = ({
  handleClick = async () => {},
  label = "Confirm",
  type = "button",
  isSubmitting = false,
}) => {
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (!disabled) {
      setDisabled(isSubmitting);
    }
  }, [isSubmitting]);
  return (
    <button
      type={type}
      className="px-5 py-3 bg-gray-900 duration-300 ease-in-out hover:bg-gray-800 text-white font-semibold rounded-md w-32"
      onClick={async () => {
        setDisabled(true);
        await handleClick();
        setDisabled(false);
      }}
      disabled={disabled}
    >
      {!disabled ? label : "Saving.."}
    </button>
  );
};

export const ModalSecondaryButton = ({ handleClick, label = "Cancel" }) => {
  return (
    <button
      type="button"
      className="px-5 py-3  duration-300 ease-in-out hover:bg-gray-100 font-semibold rounded-md"
      onClick={() => {
        handleClick();
      }}
    >
      {label}
    </button>
  );
};
