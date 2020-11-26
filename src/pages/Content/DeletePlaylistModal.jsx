import React from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

export const DeletePlaylistModal = (props) => {
  const { modalDelete, toggleDelete, onPlaylistDelete, check, onGetPlaylist, checkSet } = props;

  const onDelete = () => {
    onPlaylistDelete({ id: check.id });
    toggleDelete();
    onGetPlaylist();
    checkSet("");
  };

  return (
    <div>
      <Modal isOpen={modalDelete} toggle={toggleDelete}>
        <ModalHeader toggle={toggleDelete}>
          Are you sure you want to delete "{check.name}" playlist?
        </ModalHeader>
        <ModalFooter>
          <Button color="secondary" className="w-sm" onClick={toggleDelete}>
            Cancel
          </Button>
          <Button color="danger" className="w-sm" onClick={onDelete}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeletePlaylistModal;
