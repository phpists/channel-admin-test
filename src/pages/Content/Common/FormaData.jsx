import React, { useState } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import {
  Button,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";

const FormaData = (props) => {
  const {
    valueButton,
    editName,
    setEditName,
    editDescription,
    setChekedItems,
    setChangePage,
    setCheckName,
    setCheckDesc,
    setEditDescription,
    onUpdatePlaylist,
    checkedItems,
    onGetPlaylist,
    activeChannel,
    onAddPlaylist,
    modalSave,
    setModalSave,
    onUpdateVideo,
    onAddVideoToPlaylist,
    onGetVideosByPlaylist,
    getPlaylist,
    characters,
  } = props;

  const [require, setRequire] = useState(false);
  const [playlistId, setPlaylistId] = useState(characters[0].id);

  // On submit
  function onSubmit() {
    if (editName === "" || editDescription === "") {
      setRequire(true);
    } else {
      switch (valueButton) {
        case "editPlaylist":
          onUpdatePlaylist({ id: checkedItems[0], name: editName });
          onGetPlaylist({ id: activeChannel.id });
          break;
        case "newPlaylist":
          onAddPlaylist({
            name: editName,
            description: editDescription,
            channel_id: activeChannel.id,
          });
          onGetPlaylist({ id: activeChannel.id });
          break;
        case "editVideo":
          onUpdateVideo({ id: checkedItems[0], name: editName });
          onGetVideosByPlaylist(getPlaylist);
          break;
        case "newVideo":
          onAddVideoToPlaylist({
            playlist_id: playlistId,
            video_id: checkedItems[0],
          });
          onGetVideosByPlaylist(getPlaylist);
          break;
      }
      setCheckName("");
      setCheckDesc("");
      setEditName("");
      setEditDescription("");
      setChangePage(false);
      setChekedItems([]);
    }
  }

  const getPlailistId = (e) => {
    const name = e.target.value;
    const arr = characters?.filter((c) => c.name == name);
    const id = arr[0]?.id;
    setPlaylistId(id);
  };

  // Modal window (Save changes)
  const toggleSave = () => {
    setModalSave(!modalSave);
  };

  // On chnage global function
  const onChanged = (setName) => (e) => {
    setName(e.target.value);
  };

  return (
    <AvForm onValidSubmit={onSubmit}>
      <FormGroup className="w-50">
        <AvField
          name="title"
          className="form-control"
          placeholder="title"
          type="text"
          required={require}
          label="Title"
          value={editName}
          onChange={onChanged(setEditName)}
        />
        <AvField
          className="form-control"
          type="textarea"
          rows="5"
          label="Description"
          name="description"
          required={require}
          placeholder="description"
          value={editDescription}
          onChange={onChanged(setEditDescription)}
        />
        {valueButton === "editVideo" || valueButton === "newVideo" ? (
          <AvField
            type="select"
            name="select"
            label="Option"
            helpMessage="Please, chose playlist"
            vlaue={playlistId}
            onChange={(e) => getPlailistId(e)}
          >
            {characters.map((c) => {
              return <option key={c.id}>{c.name}</option>;
            })}
          </AvField>
        ) : null}
      </FormGroup>
      <FormGroup>
        <Button
          type="submit"
          color="primary"
          className="mr-1 waves-effect waves-light"
        >
          Save Changes
        </Button>
        <Button
          onClick={() => {
            setChekedItems([]);
            setChangePage(false);
            setCheckName("");
            setCheckDesc("");
            setEditName("");
            setEditDescription("");
          }}
          type="button"
          color="secondary"
          className="waves-effect"
        >
          Cancel
        </Button>
      </FormGroup>
      <Modal isOpen={modalSave} toggle={toggleSave}>
        <ModalHeader toggle={toggleSave}>Are you sure?</ModalHeader>
        <ModalBody>
          You have unsaved data. You want to leave the page?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" className="w-sm" onClick={toggleSave}>
            Cancel
          </Button>
          <Button color="danger" className="w-sm" onClick={onSubmit}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </AvForm>
  );
};

export default FormaData;
