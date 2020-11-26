import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Input } from "reactstrap";

export const EditPlaylistModal = (props) => {
  const { modalEdit, toggleEdit, onUpdatePlaylist, check, onGetPlaylist, checkSet } = props;
  const [editName, setEditName] = useState(check?.name || '')

  const onEdit = () => {
    onUpdatePlaylist({ id: check?.id, name: editName});
    toggleEdit();
    onGetPlaylist()
    if(check?.name !== editName) {
      checkSet("")
    }
  };

  useEffect(() => {
    if(check) {
        setEditName(check?.name)
    }
}, [check])

  return (
    <div>
      <Modal isOpen={modalEdit} toggle={toggleEdit}>
        <ModalHeader toggle={toggleEdit}>
        Еnter a new playlist name
        </ModalHeader>
        <ModalBody>
            <Input value={editName} onChange={(e) => {setEditName(e.target.value)}}/>
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
