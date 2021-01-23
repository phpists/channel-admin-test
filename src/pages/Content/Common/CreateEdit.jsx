import React, { useEffect, useState } from "react";
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
import { Prompt } from "react-router";

const CreateEdit = (props) => {
  // Get props
  const {
    onAddPlaylist,
    onUpdatePlaylist,
    defaultChannel,
    setChangePage,
    onGetPlaylist,
    valueButton,
    checkName,
    setCheckName,
    modalSave,
    editName,
    setEditName,
    editDescription,
    setEditDescription,
    setChekedItems,
    setModalSave,
    setCheckDesc,
    onUpdateVideo,
    onAddVideoToPlaylist,
    onGetVideosByPlaylist,
    getPlaylist,
    characters,
    setSelectedPage,
    checkId,
    channelLanguages,
    onGetChannelLanguages,
    languagesAll,
    getLanguages
  } = props;
  // State local
  const [require, setRequire] = useState(false);
  const [playlistId, setPlaylistId] = useState(characters[0]?.id);
  const [lngEng, setLngEng] = useState(null); // state for eng languages

  function onSubmit() {
    if (editName === "" || editDescription === "") {
      setRequire(true);
    } else {
      switch (valueButton) {
        case "editPlaylist":
          onUpdatePlaylist({ id: checkId, name: editName });
          setTimeout(() => {
            onGetPlaylist({ id: defaultChannel.id, count: 0 });
          }, 1000);
          break;
        case "newPlaylist":
          onAddPlaylist({
            name: editName,
            description: editDescription,
            channel_id: defaultChannel.id,
          });
          setTimeout(() => {
            onGetPlaylist({ id: defaultChannel.id, count: 0 });
          }, 1000);
          break;
        case "editVideo":
          onUpdateVideo({ id: checkId, name: editName });
          setTimeout(() => {
            onGetVideosByPlaylist({
              id: getPlaylist,
              channel: defaultChannel?.id,
              count: 0,
            });
          }, 1000);
          break;
        case "newVideo":
          onAddVideoToPlaylist({
            playlist_id: playlistId,
            video_id: checkId,
          });
          setTimeout(() => {
            onGetVideosByPlaylist({
              id: getPlaylist,
              channel: defaultChannel?.id,
              count: 0,
            });
          }, 1000);
          break;
        default:
          return;
      }
      setCheckName("");
      setCheckDesc("");
      setEditName("");
      setEditDescription("");
      setChangePage(false);
      setChekedItems([]);
      setSelectedPage(1);
    }
  }

  const toggleSave = () => {
    setModalSave(!modalSave);
  };

  useEffect(() => {
    if (checkName !== editName) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = undefined;
    }
  }, [checkName, editName]);

  return (
    <Card>
      <Prompt
        when={checkName !== editName}
        message="You have unsaved data. You want to leave the page?"
      />
      <AvForm onValidSubmit={onSubmit}>
        <CardBody>
          {/* Toggle languages */}
          <LanguagesTabs
            {...{ lngEng, setLngEng, channelLanguages, onGetChannelLanguages, languagesAll, getLanguages }} 
          />
          {/* Form group with validation */}
          <FormaData
            {...{
              valueButton,
              editName,
              setEditName,
              editDescription,
              setPlaylistId,
              setEditDescription,
              characters,
              require,
              lngEng,
              setLngEng,
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
