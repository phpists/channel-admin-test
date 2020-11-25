import React from "react";
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Input } from "reactstrap";

export const EditPlaylistModal = (props) => {
  const { modalEdit, toggleEdit, onUpdatePlaylist, playlistId, playlistName, setPlaylistName } = props;

  const onEdit = () => {
    onUpdatePlaylist({ id: playlistId, name: playlistName});
    toggleEdit();
  };

  return (
    <div>
      <Modal isOpen={modalEdit} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit}>
        Еnter a new playlist name
        </ModalHeader>
        <ModalBody>
            <Input value={playlistName} onChange={(e) => {setPlaylistName(e.target.value)}}/>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" className="w-sm" onClick={toggleEdit}>
            Cancel
          </Button>
          <Button color="danger" className="w-sm" onClick={onEdit}>
            Edit
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditPlaylistModal;
