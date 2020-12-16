import React, { useEffect, useState } from "react";
import PaginationComponent from "react-reactstrap-pagination";

const PaginationVideos = (props) => {
  const {
    countVideos,
    onGetVideos,
    updateDragVideo,
    videos,
    selectedPage,
    setSelectedPage,
  } = props;

  const handleSelected = (page) => {
    onGetVideos((page - 1) * 25);
    setSelectedPage(page);
  };

  useEffect(() => {
    if (selectedPage) {
      updateDragVideo(videos);
    }
  }, [selectedPage, videos]);

  return (
    <div className="d-flex justify-content-center">
      <PaginationComponent
        totalItems={countVideos}
        pageSize={25}
        onSelect={handleSelected}
        defaultActivePage={selectedPage}
      />
    </div>
  );
};

export default PaginationVideos;
