import React, { useState } from "react";
import "../content.scss";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardTitle,
  CardSubtitle,
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { AvField, AvForm } from "availity-reactstrap-validation";
import LanguagesTabs from "./LanguagesTabs";
import FormaData from "./FormaData";

const CreateEdit = (props) => {
  // Get props
  const {
    onAddPlaylist,
    onUpdatePlaylist,
    activeChannel,
    setChangePage,
    onGetPlaylist,
    valueButton,
    setCheckName,
    modalSave,
    editName,
    setEditName,
    editDescription,
    setEditDescription,
    setChekedItems,
    setModalSave,
    checkedItems,
    setCheckDesc,
    onUpdateVideo,
    onAddVideoToPlaylist,
    onGetVideosByPlaylist,
    getPlaylist,
    characters,
  } = props;
  // State local
  const [require, setRequire] = useState(false);
  const [playlistId, setPlaylistId] = useState(characters[0].id);

  function onSubmit() {
    if (editName === "" || editDescription === "") {
      setRequire(true);
    } else {
      switch (valueButton) {
        case "editPlaylist":
          onUpdatePlaylist({ id: checkedItems[0], name: editName });
          onGetPlaylist({ id: activeChannel.id });
          break;
        case "newPlaylist":
          onAddPlaylist({
            name: editName,
            description: editDescription,
            channel_id: activeChannel.id,
          });
          onGetPlaylist({ id: activeChannel.id });
          break;
        case "editVideo":
          onUpdateVideo({ id: checkedItems[0], name: editName });
          onGetVideosByPlaylist(getPlaylist);
          break;
        case "newVideo":
          onAddVideoToPlaylist({
            playlist_id: playlistId,
            video_id: checkedItems[0],
          });
          onGetVideosByPlaylist(getPlaylist);
          break;
      }
      setCheckName("");
      setCheckDesc("");
      setEditName("");
      setEditDescription("");
      setChangePage(false);
      setChekedItems([]);
    }
  }

  const toggleSave = () => {
    setModalSave(!modalSave);
  };

  return (
    <Card>
      <AvForm onValidSubmit={onSubmit}>
        <CardBody>
          {/* Toggle languages */}
          <LanguagesTabs />
          {/* Form group with validation */}
          <FormaData
            {...{
              valueButton,
              editName,
              setEditName,
              editDescription,
              setChekedItems,
              setChangePage,
              setCheckName,
              setCheckDesc,
              setEditDescription,
              onUpdatePlaylist,
              checkedItems,
              onGetPlaylist,
              activeChannel,
              onAddPlaylist,
              modalSave,
              setModalSave,
              onUpdateVideo,
              onAddVideoToPlaylist,
              onGetVideosByPlaylist,
              getPlaylist,
              characters,
              playlistId,
              setPlaylistId,
              require
            }}
          />
        </CardBody>
        <CardBody>
          <CardTitle>Meta Data</CardTitle>
          <CardSubtitle className="mb-3">
            Fill all information below
          </CardSubtitle>
          {/* Form group without validation */}
          <FormGroup>
            <Row>
              <Col sm={6}>
                <AvField
                  id="metatitle"
                  label="Meta title"
                  name="productname"
                  type="text"
                  className="form-control"
                />
                <AvField
                  label="Meta Keyword"
                  id="metakeywords"
                  name="manufacturername"
                  type="text"
                  className="form-control"
                />
              </Col>

              <Col sm={6}>
                <AvField
                  label="Meta Description"
                  type="textarea"
                  className="form-control"
                  id="metadescription"
                  name="Meta Description"
                  rows="5"
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Button
              type="submit"
              color="primary"
              className="mr-1 waves-effect waves-light"
            >
              Save Changes
            </Button>
            <Button
              onClick={() => {
                setChekedItems([]);
                setChangePage(false);
                setCheckName("");
                setCheckDesc("");
                setEditName("");
                setEditDescription("");
              }}
              type="button"
              color="secondary"
              className="waves-effect"
            >
              Cancel
            </Button>
          </FormGroup>
          <Modal isOpen={modalSave} toggle={toggleSave}>
            <ModalHeader toggle={toggleSave}>Are you sure?</ModalHeader>
            <ModalBody>
              You have unsaved data. You want to leave the page?
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" className="w-sm" onClick={toggleSave}>
                Cancel
              </Button>
              <Button color="danger" className="w-sm" onClick={onSubmit}>
                Save Changes
              </Button>
            </ModalFooter>
          </Modal>
        </CardBody>
      </AvForm>
    </Card>
  );
};

export default CreateEdit;
