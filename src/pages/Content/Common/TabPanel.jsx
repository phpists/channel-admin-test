import React, { useEffect } from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import EmptyMessage from "./EmptyMessage";
import DeleteModal from "./DeleteModal";
import CreateEdit from "./CreateEdit";
import ButtonsAPIPlaylist from "../ButtonsAPI/ButtonsAPIPlaylist";
import CheckItems from "./CheckItems";
import ButtonsAPIVideo from "../ButtonsAPI/ButtonsAPIVideo";

const TabPanel = (props) => {
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
    onGetVideos,
    updateDragVideo,
    videos,
    activeTab,
    dragVIdeo,
    setGetPlaylist,
    videosByPlaylist
  } = props;

  useEffect(() => {
    if (playlists === null) {
      onGetPlaylist({ id: defaultChannel?.id || "1" });
    }
    if (
      characters === null ||
      playlists?.length !== characters?.length ||
      checkName == editName
    ) {
      updateCharacters(playlists);
    }

    if (
      videosByPlaylist === null ||
      videosByPlaylist?.length !== dragVIdeo?.length ||
      checkName == editName
    ) {
      updateDragVideo(videosByPlaylist);
    }
    if (getPlaylist === null) {
      onGetVideos();
      updateDragVideo(videos);
    }
  }, [defaultChannel, playlists,videosByPlaylist, videos, getPlaylist]);

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
            {activeTab === "1" ? characters?.length : dragVIdeo?.length || 0} Total
          </CardSubtitle>
      { activeTab === "1"   
       ? <ButtonsAPIPlaylist
            {...{
              characters,
              changePagePlaylist,
              checkedItems,
              toggleDelete,
            }}
          />
        : <ButtonsAPIVideo
        {...{
          getPlaylist,
          setGetPlaylist,
          onGetVideos,
          setChekedItems,
          characters,
          toggleDelete,
          onGetVideosByPlaylist,
          dragVIdeo,
          changePagePlaylist,
          checkedItems,
        }}
      />
        }
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
          ) : activeTab === "1" ? (
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
          ) : (
            <CheckItems
              items={dragVIdeo}
              updateItems={updateDragVideo}
              {...{
                handleOnDragEnd,
                characters,
                handleChange,
                checkedItems,
                setChekedItems,
              }}
            />
          )}
        </CardBody>
      )}
    </Card>
  );
};

export default TabPanel;
