import React, { useEffect } from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import EmptyMessage from "../Common/EmptyMessage";
import DeleteModal from "../Common/DeleteModal";
import CreateEdit from "../Common/CreateEdit";
import ButtonsAPI from "./ButtonsAPI";
import CheckItems from "../Common/CheckItems";

const Playlists = (props) => {
  const {
    characters,
    changePagePlaylist,
    checkedItems,
    toggleDelete,
    checkName,
    setCheckName,
    setCheckDesc,
    modalDelete,
    onPlaylistDelete,
    onGetPlaylist,
    activeChannel,
    setChekedItems,
    handleOnDragEnd,
    handleChange,
    updateCharacters,
    playlists,
    defaultChannel,
    onAddPlaylist,
    onUpdatePlaylist,
    changePage,
    setChangePage,
    valueButton,
    editName,
    setEditName,
    editDescription,
    setEditDescription,
    modalSave,
    setModalSave,
    item,
    onRemoveVideoFromPlaylist,
    onUpdateVideo,
    onAddVideoToPlaylist,
    onGetVideosByPlaylist,
    getPlaylist,
  } = props;

  useEffect(() => {
    if (playlists === null) {
      onGetPlaylist({ id: defaultChannel?.id || "1" });
    }
    if (
      characters === null ||
      playlists.length !== characters.length ||
      checkName == editName
    ) {
      updateCharacters(playlists);
    }
  }, [defaultChannel, playlists]);

  return (
    <Card className="flex-column align-items-start">
      {changePage ? (
        <CardBody className="w-100">
          {" "}
          <CreateEdit
            {...{
              activeChannel,
              onAddPlaylist,
              setChangePage,
              onGetPlaylist,
              valueButton,
              onUpdatePlaylist,
              setCheckName,
              setCheckDesc,
              checkName,
              modalSave,
              setModalSave,
              editName,
              setEditName,
              editDescription,
              setEditDescription,
              setChekedItems,
              checkedItems,
              onUpdateVideo,
              onAddVideoToPlaylist,
              onGetVideosByPlaylist,
              getPlaylist,
              characters,
            }}
          />
        </CardBody>
      ) : (
        <CardBody className="w-100">
          <CardTitle>Playlists</CardTitle>
          <CardSubtitle className="mb-3">
            {characters?.length || 0} Total
          </CardSubtitle>
          <ButtonsAPI
            {...{
              characters,
              changePagePlaylist,
              checkedItems,
              toggleDelete,
            }}
          />
          <DeleteModal
            {...{
              checkName,
              checkedItems,
              setCheckName,
              setCheckDesc,
              modalDelete,
              toggleDelete,
              onPlaylistDelete,
              onGetPlaylist,
              activeChannel,
              setChekedItems,
              item,
              onRemoveVideoFromPlaylist,
              getPlaylist,
              onGetVideosByPlaylist,
            }}
          />
          {characters?.length === 0 || characters === null ? (
            <EmptyMessage {...{ characters }} />
          ) : (
            <CheckItems
              items={characters}
              updateItems={updateCharacters}
              {...{
                checkedItems,
                setChekedItems,
                handleOnDragEnd,
                handleChange,
                characters,
              }}
            />
          )}
        </CardBody>
      )}
    </Card>
  );
};

export default Playlists;
