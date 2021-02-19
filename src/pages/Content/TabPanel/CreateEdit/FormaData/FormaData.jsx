import React, { useState } from "react";
import { AvField } from "availity-reactstrap-validation";
import { FormGroup } from "reactstrap";
import { Multiselect } from "multiselect-react-dropdown";

const FormaData = (props) => {
  const {
    valueButton,
    editName,
    setEditName,
    editDescription,
    setPlaylistId,
    setEditDescription,
    characters,
    require,
    getPlaylist,
    playlistsByVideo,
    onAddVideoToPlaylist,
    onRemoveVideoFromPlaylist,
    oneVideo
  } = props;

  // --- default playlist on current video ---
  const values = playlistsByVideo?.map(p => p.playlist_id);
  const defaultPalylists = playlistsByVideo && characters?.filter(c => {
      return values.includes(c.id)
  });
  // --- end ---

  // On chnage global function
  const onChanged = (setName) => (e) => {
    setName(e.target.value);
  };
  // Select languages
  const selectLang = (selectedList, selectedItem) => {
    const id = selectedItem.id;
    // setPlaylistId(id);

    onAddVideoToPlaylist({
      playlist_id: id,
      video_id: oneVideo.id,
    });
  };
  // Remove languages
  const removeLang = (selectedList, selectedItem) => {
    const id = selectedItem.id;
    // setPlaylistId(null);
    onRemoveVideoFromPlaylist({
      playlist_id: id,
      video_id: oneVideo.id,
    })
  };

  return (
    <>
      <FormGroup className="w-100 mt-4">
        <AvField
          name="title"
          className="form-control"
          placeholder="title"
          type="text"
          required={require}
          label="Title"
          value={editName}
          onChange={onChanged(setEditName)}
          className="w-50"
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
          className="w-50"
        />
        {valueButton === "editVideo" || valueButton === "newVideo" ? (
          <Multiselect
            options={characters}
            selectedValues={defaultPalylists}
            displayValue="name"
            onSelect={selectLang}
            onRemove={removeLang}
            closeIcon="cancel"
            placeholder="Select playlist"
          />
        ) : null}
      </FormGroup>
    </>
  );
};

export default FormaData;
