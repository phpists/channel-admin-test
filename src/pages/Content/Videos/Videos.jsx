import React, { useEffect } from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import EmptyMessage from "../Common/EmptyMessage";
import ButtonsAPIVideo from "./ButtonsAPIVideo";
import CheckItems from "../Common/CheckItems";
import DeleteModal from "../Common/DeleteModal";
import CreateEdit from "../Common/CreateEdit";

const Videos = (props) => {
  const {
    checkedItems,
    checkName,
    setCheckName,
    setCheckDesc,
    setChekedItems,
    handleOnDragEnd,
    handleChange,
    videosByPlaylist,
    changePage,
    editName,
    setEditName,
    setEditDescription,
    valueButton,
    onUpdateVideo,
    onAddVideoToPlaylist,
    modalSave,
    setModalSave,
    characters,
    dragVIdeo,
    updateDragVideo,
    onGetVideosByPlaylist,
    getPlaylist,
    setGetPlaylist,
    setActiveTab,
    onRemoveVideoFromPlaylist,
    onGetVideos,
    videos,
    changePagePlaylist,
    item,
    modalDelete,
    onPlaylistDelete,
    toggleDelete,
    setChangePage,
    activeChannel,
    onAddPlaylist,
    onGetPlaylist,
    onUpdatePlaylist,
    editDescription
  } = props;

  useEffect(() => {
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
  }, [videosByPlaylist, videos, getPlaylist]);

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
              characters
            }}
          />
        </CardBody>
      ) : (
        <CardBody className="w-100">
          <CardTitle>Videos</CardTitle>
          <CardSubtitle className="mb-3">
            {dragVIdeo?.length || 0} Total
          </CardSubtitle>

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
              changePagePlaylist,
              checkedItems,
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
          {dragVIdeo?.length === 0 || dragVIdeo === null ? (
            <EmptyMessage {...{ setActiveTab, characters }} />
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

export default Videos;
