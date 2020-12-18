import React, { useEffect } from "react";
import PaginationComponent from "react-reactstrap-pagination";

const PaginationVideos = (props) => {
  const {
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
    countVideosByPlaylist,
    getPlaylist,
    onGetVideosByPlaylist
  } = props;

  const handleSelected = (page) => {
    // if(getPlaylist === null) {
    
    // } else {
    //   onGetVideosByPlaylist( {id: getPlaylist?.id, count: ((page - 1) * 25)});
    //   setSelectedPage(page);
    // }

    if(activeTab === "1") {
      onGetPlaylist( {id: defaultChannel?.id, count: ((page - 1) * 25)});
      setSelectedPage(page);
    } else {
      onGetVideos( {id: defaultChannel?.id, count: ((page - 1) * 25)});
      setSelectedPage(page);
    }
  };

  useEffect(() => {
    if (selectedPage) {
      updateDragVideo(videos);
    }
  }, [selectedPage, videos]);

  return (
    <div className="d-flex justify-content-center">
      <PaginationComponent
        totalItems={activeTab === "1" ? countPlaylists : countVideos}
        pageSize={25}
        onSelect={handleSelected}
        defaultActivePage={selectedPage}
      />
    </div>
  );
};

export default PaginationVideos;