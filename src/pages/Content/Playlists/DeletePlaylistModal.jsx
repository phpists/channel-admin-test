import React from "react";
import { axiosInstance } from '../../../helpers/api';
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import { sha1 } from '../../../helpers/sha1';

export const DeletePlaylistModal = (props) => {
  // Get props
  const {
    modalDelete,
    toggleDelete,
    //onPlaylistDelete,
    //checkId,
    checkName,
    onGetPlaylist,
    setCheckName,
    setChekedItems,
    activeChannel,
    checkedItems
  } = props;

  // DELETE PLAYLIST

  const onDelete = async () => {
    const ids = checkedItems;
    const promises = ids.map(deletePlaylistAction)
    try {
      await Promise.all(promises)
      toggleDelete();
      onGetPlaylist({ id: activeChannel ?.id });
      setCheckName("");
      setChekedItems([]);
    } catch (err) {
      console.error(err)
    }
  };


  function deletePlaylistAction(id) {
    const authData = sessionStorage.getItem('bringStreamAuth') ? JSON.parse(sessionStorage.getItem('bringStreamAuth')) : null
    if (!authData) return false
    const queryString = `action=DeletePlaylist&openKey=${authData.openKey}`;
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
      <Modal isOpen={modalDelete} toggle={toggleDelete}>
        <ModalHeader toggle={toggleDelete}>
          Are you sure you want to delete "{checkName}" playlist?
        </ModalHeader>
        <ModalFooter>
          <Button color="secondary" className="w-sm" onClick={toggleDelete}>
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

export default DeletePlaylistModal;