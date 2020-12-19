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
    countVideos,
    countPlaylists,
    selectedPage,
    setSelectedPage,
    toEdit,
    setActiveTab,
    countVideosByPlaylist,
  } = props;

  useEffect(() => {
    if (playlists === null) {
      onGetPlaylist({ id: defaultChannel?.id || "1", count: 0 });
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
        onGetPlaylist({ id: defaultChannel?.id || "1", count: 0 });
      }
    }
    if (selectedPage === null) {
      onGetVideos({ id: defaultChannel?.id, count: 0 });
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
              checkName,
              selectedPage,
              setSelectedPage,
              defaultChannel,
              countVideosByPlaylist
            }}
          />
        </CardBody>
      ) : (
        <CardBody className="w-100">
          <CardTitle>{activeTab === "1" ? "Playlists" : "Videos"}</CardTitle>
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
                setSelectedPage,
                updateDragVideo,
                videos,
                defaultChannel,
              }}
            />
          )}
          <DeleteModal
            {...{
              modalDelete,
              toggleDelete,
              onPlaylistDelete,
              checkName,
              onGetPlaylist,
              setCheckName,
              setCheckDesc,
              setChekedItems,
              activeChannel,
              checkedItems,
              item,
              onRemoveVideoFromPlaylist,
              getPlaylist,
              onGetVideosByPlaylist,
              defaultChannel,
            }}
          />
          {activeTab === "1" ? (
            characters?.length === 0 || characters === null ? (
              <EmptyMessage {...{ setActiveTab, activeTab }} />
            ) : (
              <>
                <CheckItems
                  items={characters}
                  updateItems={updateCharacters}
                  {...{
                    checkedItems,
                    setChekedItems,
                    handleOnDragEnd,
                    handleChange,
                    characters,
                    toEdit,
                  }}
                />
                {countPlaylists > 25 || characters?.length > 25 ?  (
                  <PaginationVideos
                    {...{
                      countVideos,
                      onGetVideos,
                      updateDragVideo,
                      videos,
                      selectedPage,
                      setSelectedPage,
                      defaultChannel,
                      onGetPlaylist,
                      countPlaylists,
                      activeTab,
                      getPlaylist,
                      onGetVideosByPlaylist,
                      countVideosByPlaylist,
                      updateCharacters,
                      playlists
                    }}
                  />
                ) : null}
              </>
            )
          ) : dragVIdeo?.length === 0 || dragVIdeo === null ? (
            <EmptyMessage {...{ setActiveTab, activeTab }} />
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
                  toEdit,
                }}
              />
              {countVideos > 25 || dragVIdeo?.length > 25 || countVideosByPlaylist > 25? (
                <PaginationVideos
                  {...{
                    countVideos,
                    onGetVideos,
                    updateDragVideo,
                    videos,
                    selectedPage,
                    setSelectedPage,
                    defaultChannel,
                    onGetPlaylist,
                    countPlaylists,
                    activeTab,
                    getPlaylist,
                    onGetVideosByPlaylist,
                    countVideosByPlaylist,
                    updateCharacters,
                    playlists
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
