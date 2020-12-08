import React, { useEffect } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  TabContent,
  TabPane,
  Card,
  CardBody,
  Row,
  Col,
  Container,
} from "reactstrap";
import "./content.scss";
import CreatePlaylist from "./Playlists/CreatePlaylist";
import Upload from "./Upload/Upload";
import Playlists from "./Playlists/Playlists";
import Videos from "./Videos/Videos";
import TabButton from "./TabButton/TabButton";
import CreateVideo from "./Videos/CreateVideos";

const Content = (props) => {
  // Get props
  const {
    activeChannel,
    onAddPlaylist,
    playlists,
    onPlaylistDelete,
    onUpdatePlaylist,
    onGetPlaylist,
    videos,
    activeTab,
    toggleTab,
    characters,
    changePlaylist,
    setChangePlaylist,
    valueButton,
    setCheckName,
    checkName,
    checkId,
    modalSave,
    setModalSave,
    editNamePlaylist,
    setEditNamePlaylist,
    editDescriptionPlaylist,
    setEditDescriptionPlaylist,
    setChekedItems,
    changePagePlaylist,
    checkedItems,
    toggleDelete,
    modalDelete,
    handleOnDragEnd,
    handleChange,
    updateCharacters,
    defaultChannel,

    changeVideos,
    setChangeVideo,
    changePageVideo,
    editNameVideos,
    setEditNameVideos,
    editDescriptionVideos,
    setEditDescriptionVideos,
    checkNameVideos,
    setCheckNameVideos,
    checkIdVideos,
    valueButtonVideos,
    checkedItemsVideos,
    setChekedItemsVideos,
    handleChangeVideos,
    onGetVideos,
    onUpdateVideo,
    onAddVideoToPlaylist,
    modalDeleteVideos,
    toggleDeleteVideos,
  } = props;

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={"Dashboard"} breadcrumbItem={"content"} />
          <Row className="align-items-start">
            {/* LEFT PANEL */}
            <Col xs="12" sm="5" md="4" lg="3">
              <Card>
                <CardBody>
                  <TabButton
                    {...{ activeTab, toggleTab, characters, videos }}
                  />
                </CardBody>
              </Card>
            </Col>
            {/* RIGHT PANEL */}
            <Col xs="12" sm="7" md="8" lg="9">
              <TabContent activeTab={activeTab}>
                {changePlaylist ? (
                  <CreatePlaylist
                    {...{
                      activeChannel,
                      onAddPlaylist,
                      setChangePlaylist,
                      onGetPlaylist,
                      valueButton,
                      onUpdatePlaylist,
                      setCheckName,
                      checkName,
                      checkId,
                      modalSave,
                      setModalSave,
                      editNamePlaylist,
                      setEditNamePlaylist,
                      editDescriptionPlaylist,
                      setEditDescriptionPlaylist,
                      setChekedItems,
                    }}
                  />
                ) : (
                  <TabPane tabId="1">
                    <Playlists
                      {...{
                        characters,
                        changePagePlaylist,
                        checkedItems,
                        toggleDelete,
                        checkId,
                        checkName,
                        setCheckName,
                        modalDelete,
                        onPlaylistDelete,
                        onGetPlaylist,
                        activeChannel,
                        setChekedItems,
                        handleOnDragEnd,
                        handleChange,
                        updateCharacters,
                        playlists,
                        defaultChannel,
                        videos,
                      }}
                    />
                  </TabPane>
                )}
                <TabPane tabId="2">
                  {changeVideos ? (
                    <CreateVideo
                      {...{
                        setChangeVideo,
                        onGetVideos,
                        onUpdateVideo,
                        onAddVideoToPlaylist,
                        setChangeVideo,
                        valueButtonVideos,
                        setCheckNameVideos,
                        checkNameVideos,
                        checkIdVideos,
                        modalSave,
                        setModalSave,
                        editNameVideos,
                        setEditNameVideos,
                        editDescriptionVideos,
                        setEditDescriptionVideos,
                        setChekedItemsVideos,
                        characters,
                      }}
                    />
                  ) : (
                    <Videos
                      {...{
                        characters,
                        changePageVideo,
                        checkedItemsVideos,
                        checkIdVideos,
                        checkNameVideos,
                        setCheckNameVideos,
                        setChekedItemsVideos,
                        handleOnDragEnd,
                        handleChangeVideos,
                        videos,
                        onGetVideos,
                        setChangeVideo,
                        modalDeleteVideos,
                        toggleDeleteVideos,
                      }}
                    />
                  )}
                </TabPane>
                <TabPane tabId="3">
                  <Card>
                    <Upload />
                  </Card>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Content;
