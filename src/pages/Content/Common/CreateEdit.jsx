import React, { useEffect, useState } from "react";
import "../content.scss";
import {
  Card,
  CardBody,
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
import MetaForma from "./MetaForma";

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
    getLanguages,
    metaTitle,
    setMetaTitle,
    metaKeyword,
    setMetaKeyword,
    metaDesc,
    setMetaDesc,
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
          onUpdatePlaylist({
            id: checkId,
            name: editName,
            description: JSON.stringify({
              en: {
                name: editName,
                description: editDescription,
                seo_title: metaTitle,
                seo_keyword: metaKeyword,
                seo_description: metaDesc,
              },
            }),
          });
          setTimeout(() => {
            onGetPlaylist({ id: defaultChannel.id, count: 0 });
          }, 1000);
          break;
        case "newPlaylist":
          onAddPlaylist({
            name: editName,
            description: JSON.stringify({
              en: {
                name: editName,
                description: editDescription,
                seo_title: metaTitle,
                seo_keyword: metaKeyword,
                seo_description: metaDesc,
              },
            }),
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
            {...{
              setLngEng,
              languagesAll,
              channelLanguages,
              onGetChannelLanguages,
              getLanguages,
            }}
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
            }}
          />
        </CardBody>
        <CardBody>
          <MetaForma
            {...{
              valueButton,
              metaTitle,
              setMetaTitle,
              metaKeyword,
              setMetaKeyword,
              metaDesc,
              setMetaDesc,
              require,
              lngEng,
            }}
          />
        </CardBody>
        <FormGroup className="text-right mr-3">
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
      </AvForm>
    </Card>
  );
};

export default CreateEdit;
