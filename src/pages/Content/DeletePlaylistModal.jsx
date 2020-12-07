import React from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

export const DeletePlaylistModal = (props) => {
  // Get props
  const {
    modalDelete,
    toggleDelete,
    onPlaylistDelete,
    checkId,
    checkName,
    onGetPlaylist,
    setCheckName,
    setChekedItems,
    activeChannel,
  } = props;

  // DELETE PLAYLIST
  const onDelete = () => {
    onPlaylistDelete({ id: checkId });
    toggleDelete();
    onGetPlaylist({ id: activeChannel?.id });
    setCheckName("");
    setChekedItems([]);
  };

  return (
    <div>
      <Modal isOpen={modalDelete} toggle={toggleDelete}>
        <ModalHeader toggle={toggleDelete}>
          Are you sure you want to delete "{checkName}" playlist?
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
