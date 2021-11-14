import React from "react";

export const AddButton = ({ handleClick, label = "Add" }) => {
  return (
    <button
      className="px-5 py-3 ml-3 bg-gray-300 font-semibold rounded-md"
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
  return (
    <button
      type={type}
      className={`px-5 py-3  ${
        isSubmitting
          ? "bg-gray-300 hover:bg-gray-300"
          : "bg-gray-900 hover:bg-gray-800"
      } duration-100 ease-in-out  text-white font-semibold rounded-md w-32`}
      onClick={async () => {
        await handleClick();
      }}
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
      onClick={() => {
        handleClick();
      }}
    >
      {label}
    </button>
  );
};
