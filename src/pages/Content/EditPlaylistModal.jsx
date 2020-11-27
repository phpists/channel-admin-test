import React, { useEffect, useState } from "react";
import { Button, Input, CardBody, CardTitle } from "reactstrap";

export const EditPlaylistModal = (props) => {
  const { modalEdit, toggleEdit, onUpdatePlaylist, check, onGetPlaylist, setCheck } = props;
  const [editName, setEditName] = useState(check?.name || '')

  const onEdit = () => {
    onUpdatePlaylist({ id: check?.id, name: editName});
    toggleEdit();
    onGetPlaylist()
    if(check?.name !== editName) {
      setCheck("")
    }
  };

  useEffect(() => {
    if(check) {
        setEditName(check?.name)
    }
}, [check])

  return (
    <div>
      <CardBody>
        <CardTitle className="text-center mb-3 mt-3">
        Еnter a new playlist name
        </CardTitle>
        <div className="text-center mb-3">
        <Input value={editName} onChange={(e) => {setEditName(e.target.value)}}/>
        <Button color="secondary" className="w-sm" onClick={toggleEdit}>
            Cancel
          </Button>
          <Button color="danger" className="w-sm" onClick={onEdit}>
            Edit
          </Button>
        </div>
      </CardBody>
    </div>
  );
};

export default EditPlaylistModal;
