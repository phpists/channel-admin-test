import React from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

export const DeleteVideoModal = (props) => {
  // Get props
  const {
    checkNameVideos,
    checkedItemsVideos,
    setCheckNameVideos,
    modalDeleteVideos,
    toggleDeleteVideos,
    onGetVideosByPlaylist,
    setChekedItemsVideos,
    getPlaylist,
    onRemoveVideoFromPlaylist
  } = props;

  // DELETE PLAYLIST

  const onDelete = async () => {
    const ids = checkedItemsVideos;
    const promises = ids.map((id) => onRemoveVideoFromPlaylist({
      playlist_id: getPlaylist.id, 
      video_id: id
    }))
    try {
      await Promise.all(promises)
      toggleDeleteVideos();
      onGetVideosByPlaylist(getPlaylist.id);
      setCheckNameVideos("");
      setChekedItemsVideos([]);
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <div>
      <Modal isOpen={modalDeleteVideos} toggle={toggleDeleteVideos}>
        <ModalHeader toggle={toggleDeleteVideos}>
          Are you sure you want to delete "{checkNameVideos}" video?
        </ModalHeader>
        <ModalFooter>
          <Button color="secondary" className="w-sm" onClick={toggleDeleteVideos}>
            Cancel
          </Button>
          <Button color="danger" className="w-sm" onClick={onDelete}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeleteVideoModal;