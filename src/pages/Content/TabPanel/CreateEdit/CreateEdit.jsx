import React, { useState } from "react";
import "../../content.scss";
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
import { AvForm } from "availity-reactstrap-validation";
import LanguagesTabs from "./LanguagesTabs/LanguagesTabs";
import FormaData from "./FormaData/FormaData";
import { Prompt } from "react-router";
import MetaForma from "./MetaForma/MetaForma";

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
    onGetVideos,
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
    onePlayist,
    oneVideo,
    onGetOnePlaylist,
    onGetOneVideo,
    playlistsByVideo,
    onRemoveVideoFromPlaylist,
  } = props;

  // State local
  const [require, setRequire] = useState(false);
  const [playlistId, setPlaylistId] = useState("");
  const [descLang, setDescLang] = useState({});
  // Set values on current language
  const onChangeForma = (forma) => {
    setEditName(forma.name);
    setEditDescription(forma.description);
    setMetaTitle(forma.seo_title);
    setMetaKeyword(forma.seo_keyword);
    setMetaDesc(forma.seo_description);
  };

  function onSubmit() {
    if (editName === "" || editDescription === "") {
      setRequire(true);
    } else {
      switch (valueButton) {
        case "editPlaylist":
          onUpdatePlaylist({
            id: checkId,
            name: descLang["en"]?.name || editName,
            description: JSON.stringify(descLang),
          });
          setTimeout(() => {
            onGetPlaylist({ id: defaultChannel.id, count: 0 });
          }, 1000);
          break;
        case "newPlaylist":
          onAddPlaylist({
            name: descLang["en"]?.name || editName,
            description: JSON.stringify(descLang),
            channel_id: defaultChannel.id,
          });
          setTimeout(() => {
            onGetPlaylist({ id: defaultChannel.id, count: 0 });
          }, 1000);
          break;
        case "editVideo":
          onUpdateVideo(
            getPlaylist
              ? {
                  id: checkId,
                  name: descLang["en"]?.name || editName,
                  description: JSON.stringify(descLang),
                  channel_id: defaultChannel?.id,
                  playlist_id: playlistId || getPlaylist?.id,
                }
              : {
                  id: checkId,
                  name: descLang["en"]?.name || editName,
                  description: JSON.stringify(descLang),
                  channel_id: defaultChannel?.id,
                }
          );
          setTimeout(() => {
            onGetVideosByPlaylist({
              id: getPlaylist?.id || playlistId,
              channel: defaultChannel?.id,
              count: 0,
            });
            onGetVideos({ id: defaultChannel?.id, count: 0 });
          }, 1000);
          break;
        case "newVideo":
          onAddVideoToPlaylist({
            playlist_id: playlistId,
            video_id: checkId,
          });
          setTimeout(() => {
            onGetVideosByPlaylist({
              id: getPlaylist || getPlaylist?.id,
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
      setMetaTitle("");
      setMetaKeyword("");
      setMetaDesc("");
      setChangePage(false);
      setChekedItems([]);
      setSelectedPage(1);
      setDescLang({});
      onGetOnePlaylist({ id: null });
      onGetOneVideo({ id: null });
    }
  }

  const toggleSave = () => {
    setModalSave(!modalSave);
    setChekedItems([]);
    setChangePage(false);
    setCheckName("");
    setCheckDesc("");
    setEditName("");
    setEditDescription("");
    setMetaTitle("");
    setMetaKeyword("");
    setMetaDesc("");
    setDescLang({});
    onGetOnePlaylist({ id: null });
    onGetOneVideo({ id: null });
  };

  return (
    <Card>
      <Prompt
        message={(location) => {
          if (
            location.pathname.startsWith("/content")
          ) {
            setModalSave(true);
          } else {
            setModalSave(true);
            return false
          }
        }}
      />
      <AvForm onValidSubmit={onSubmit}>
        <CardBody>
          {/* Toggle languages */}
          <LanguagesTabs
            {...{
              languagesAll,
              channelLanguages,
              onGetChannelLanguages,
              getLanguages,
              onePlayist,
              setDescLang,
              descLang,
              editName,
              editDescription,
              metaTitle,
              metaKeyword,
              metaDesc,
              onChangeForma,
              valueButton,
              oneVideo,
              onGetOnePlaylist,
              onGetOneVideo,
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
              getPlaylist,
              playlistsByVideo,
              onAddVideoToPlaylist,
              onRemoveVideoFromPlaylist,
              oneVideo,
            }}
          />
        </CardBody>
        <CardBody>
          <MetaForma
            {...{
              require,
              metaTitle,
              setMetaTitle,
              metaKeyword,
              setMetaKeyword,
              metaDesc,
              setMetaDesc,
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
              setMetaTitle("");
              setMetaKeyword("");
              setMetaDesc("");
              setDescLang({});
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
              Leave
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
