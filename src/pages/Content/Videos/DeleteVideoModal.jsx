import React from "react";
import { axiosInstance } from '../../../helpers/api';
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import { sha1 } from '../../../helpers/sha1';

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
    videosByPlaylist,
    getPlaylist
  } = props;

  // DELETE PLAYLIST

  const onDelete = async () => {
    const ids = checkedItemsVideos;
    const promises = ids.map((id) => deleteVideoAction({
      playlist_id: getPlaylist, 
      video_id: id
    }))
    try {
      await Promise.all(promises)
      toggleDeleteVideos();
      onGetVideosByPlaylist(getPlaylist);
      setCheckNameVideos("");
      setChekedItemsVideos([]);
    } catch (err) {
      console.error(err)
    }
  };


  function deleteVideoAction(data) {
    debugger;
    const authData = sessionStorage.getItem('bringStreamAuth') ? JSON.parse(sessionStorage.getItem('bringStreamAuth')) : null
    if (!authData) return false
    const queryString = `action=RemoveVideoFromPlaylist&openKey=${authData.openKey}`;
    const jsonData = JSON.stringify(data)
    const signature = sha1(queryString + authData.privateKey + jsonData);
    const formData = new FormData();
    formData.append('jsonData', jsonData)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      signature: signature
    };

    return axiosInstance.post(`?${queryString}`, formData, config)
      .catch(err => console.error(err))
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