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
    onGetVideos,
    setChekedItemsVideos
  } = props;

  // DELETE PLAYLIST

  const onDelete = async () => {
    const ids = checkedItemsVideos;
    const promises = ids.map(deleteVideoAction)
    try {
      await Promise.all(promises)
      toggleDeleteVideos();
      onGetVideos();
      setCheckNameVideos("");
      setChekedItemsVideos([]);
    } catch (err) {
      console.error(err)
    }
  };


  function deleteVideoAction(id) {
    const authData = sessionStorage.getItem('bringStreamAuth') ? JSON.parse(sessionStorage.getItem('bringStreamAuth')) : null
    if (!authData) return false
    const queryString = `action=RemoveVideoFromPlaylist&openKey=${authData.openKey}`;
    const params = { id };
    const jsonData = JSON.stringify(params)
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