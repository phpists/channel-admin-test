import React from "react";
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
import DeletePlaylistModal from "./Playlists/DeletePlaylistModal";
import Upload from "./Upload/Upload";
import Playlists from "./Playlists/Playlists";
import Videos from "./Videos/Videos";
import TabButton from "./TabButton/TabButton";

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
    onGetVideos,
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
    editName,
    setEditName,
    editDescription,
    setEditDescription,
    setChekedItems,
    changePage,
    checkedItems,
    toggleDelete,
    modalDelete,
    handleOnDragEnd,
    handleChange,
    updateCharacters,
    defaultChannel,
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
                  <TabButton {...{ activeTab, toggleTab, characters, videos }} />
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
                      editName,
                      setEditName,
                      editDescription,
                      setEditDescription,
                      setChekedItems,
                    }}
                  />
                ) : (
                  <TabPane tabId="1">
                    <Playlists
                      {...{
                        characters,
                        changePage,
                        checkedItems,
                        toggleDelete,
                        DeletePlaylistModal,
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
                  <Videos
                    {...{
                      characters,
                      changePage,
                      checkedItems,
                      toggleDelete,
                      DeletePlaylistModal,
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
                      videos,
                      onGetVideos,
                    }}
                  />
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
