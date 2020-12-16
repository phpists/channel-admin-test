import React, { useState } from "react";
import { AvField } from "availity-reactstrap-validation";
import {
  FormGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
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
  const [playlistName, setPlaylistName] = useState();
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const getPlailistId = (e) => {
    const name = e.target.name;
    const arr = characters?.filter((c) => c.name == name);
    const id = arr[0]?.id;
    setPlaylistId(id);
    setPlaylistName(name);
    debugger;
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
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} direction="left">
          <DropdownToggle
            caret
            color="secondary"
            className="btn btn-primary waves-light waves-effect"
          >
            {playlistName || "Chose playlist"}
            <span className="arrow-down" />
          </DropdownToggle>
          <DropdownMenu>
            {characters?.map((c) => {
              return (
                <DropdownItem
                  key={c.id}
                  onClick={(e) => getPlailistId(e)}
                  name={c.name}
                  id={c.id}
                >
                  {c.name}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </ButtonDropdown>
      ) : null}
    </FormGroup>
  );
};

export default FormaData;
