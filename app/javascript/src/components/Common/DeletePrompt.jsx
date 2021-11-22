import React from "react";

import { Alert } from "@bigbinary/neetoui/v2";
import propTypes from "prop-types";

const DeletePrompt = ({
  showDeletePrompt,
  message = "Are you sure you want to delete this Item?",
  item,
  handleDelete,
  handleCancel,
}) => {
  return (
    <Alert
      isOpen={showDeletePrompt}
      message={
        item && (
          <div className="px-3 py-2 bg-red-100"> {item.slice(0, 200)}</div>
        )
      }
      onClose={handleCancel}
      onSubmit={handleDelete}
      size="md"
      title={message}
    />
  );
};
DeletePrompt.propTypes = {
  showDeletePrompt: propTypes.bool.isRequired,
  message: propTypes.string,
  item: propTypes.string,
  handleDelete: propTypes.func.isRequired,
  handleCancel: propTypes.func.isRequired,
};
export default DeletePrompt;
