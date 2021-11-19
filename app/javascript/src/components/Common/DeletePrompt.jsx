import React from "react";

import { Modal } from "@bigbinary/neetoui/v2";
import propTypes from "prop-types";

import { ModalPrimaryButton, ModalSecondaryButton } from "./Buttons";

const DeletePrompt = ({
  showDeletePrompt,
  message = "Are you sure you want to delete this Item?",
  item,
  handleDelete,
  handleCancel,
}) => {
  return (
    <Modal size="sm" isOpen={showDeletePrompt} onClose={handleCancel}>
      <Modal.Header>
        <div className="text-lg font-semibold">{message}</div>
      </Modal.Header>
      <Modal.Body className="w-full">
        {item && (
          <div className="px-3 py-2 bg-red-100"> {item.slice(0, 200)}</div>
        )}
      </Modal.Body>
      <Modal.Footer className="space-x-2">
        <ModalPrimaryButton handleClick={handleDelete} label="Confirm" />
        <ModalSecondaryButton handleClick={handleCancel} label="Cancel" />
      </Modal.Footer>
    </Modal>
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
