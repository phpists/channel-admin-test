import React, { useEffect } from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import EmptyMessage from "./EmptyMessage";
import DeleteModal from "./DeleteModal";
import CreateEdit from "./CreateEdit";
import ButtonsAPIPlaylist from "../ButtonsAPI/ButtonsAPIPlaylist";
import CheckItems from "./CheckItems";
import ButtonsAPIVideo from "../ButtonsAPI/ButtonsAPIVideo";
import PaginationVideos from "../Pagination/Pagination";

const TabPanel = (props) => {
  const {
    characters,
    dragVIdeo,
    updateDragVideo,
    checkedItems,
    checkName,
    setCheckName,
    setCheckDesc,
    setChekedItems,
    handleOnDragEnd,
    handleChange,
    videosByPlaylist,
    changePage,
    setChangePage,
    editName,
    editDescription,
    setEditName,
    setEditDescription,
    valueButton,
    onUpdateVideo,
    onAddVideoToPlaylist,
    onGetVideosByPlaylist,
    getPlaylist,
    setGetPlaylist,
    onRemoveVideoFromPlaylist,
    onGetVideos,
    videos,
    modalSave,
    setModalSave,
    updateCharacters,
    item,
    modalDelete,
    toggleDelete,
    onPlaylistDelete,
    activeChannel,
    onAddPlaylist,
    onGetPlaylist,
    onUpdatePlaylist,
    activeTab,
    toForm,
    defaultChannel,
    playlists,
    count,
    selectedPage,
    setSelectedPage,
    toEdit
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

    if (getPlaylist !== null) {
      if (
        videosByPlaylist === null ||
        videosByPlaylist?.length !== dragVIdeo?.length ||
        checkName == editName
      ) {
        updateDragVideo(videosByPlaylist);
        onGetPlaylist({ id: defaultChannel?.id || "1" });
      }
    }
    if (selectedPage === null) {
      onGetVideos(0);
      updateDragVideo(videos);
      setSelectedPage(1);
    }
  }, [defaultChannel, playlists, videosByPlaylist, videos, getPlaylist]);

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
            {activeTab === "1" ? characters?.length : dragVIdeo?.length || 0}{" "}
            Total
          </CardSubtitle>
          {activeTab === "1" ? (
            <ButtonsAPIPlaylist
              {...{
                characters,
                toForm,
                checkedItems,
                toggleDelete,
                toEdit
              }}
            />
          ) : (
            <ButtonsAPIVideo
              {...{
                getPlaylist,
                setGetPlaylist,
                onGetVideos,
                setChekedItems,
                characters,
                toggleDelete,
                onGetVideosByPlaylist,
                dragVIdeo,
                toForm,
                checkedItems,
                selectedPage,
                updateDragVideo,
                videos,
              }}
            />
          )}
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
                toForm,
                checkedItems,
                setChekedItems,
                handleOnDragEnd,
                handleChange,
                characters
              }}
            />
          ) : (
            <>
              <CheckItems
                items={dragVIdeo}
                updateItems={updateDragVideo}
                {...{
                  handleOnDragEnd,
                  characters,
                  handleChange,
                  checkedItems,
                  setChekedItems,
                  toEdit
                }}
              />
              {getPlaylist === null ? (
                <PaginationVideos
                  {...{
                    count,
                    onGetVideos,
                    updateDragVideo,
                    videos,
                    selectedPage,
                    setSelectedPage,
                  }}
                />
              ) : null}
            </>
          )}
        </CardBody>
      )}
    </Card>
  );
};

export default TabPanel;
