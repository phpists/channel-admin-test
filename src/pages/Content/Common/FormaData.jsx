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
    playlistId,
    setPlaylistId,
    setEditDescription,
    characters,
    require,
  } = props;

  // On submit

  const getPlailistId = (e) => {
    const name = e.target.value;
    const arr = characters?.filter((c) => c.name == name);
    const id = arr[0]?.id;
    setPlaylistId(id);
  };

  // Modal window (Save changes)

  // On chnage global function
  const onChanged = (setName) => (e) => {
    setName(e.target.value);
  };

  return (
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
  );
};

export default FormaData;
