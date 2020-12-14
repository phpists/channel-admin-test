import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import selectors from "../../selectors";
import Actions from "../../store/actions";
import { withNamespaces } from "react-i18next";
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
import Upload from "./Upload/Upload";
import TabPanel from "./Common/TabPanel";
import TabButton from "./TabButton/TabButton";

const Content = (props) => {
  // Get props
  const {
    playlists,
    activeChannel,
    onRemoveVideoFromPlaylist,
    onAddPlaylist,
    onPlaylistDelete,
    onUpdatePlaylist,
    onGetPlaylist,
    onUpdateVideo,
    onAddVideoToPlaylist,
    onGetVideosByPlaylist,
    videosByPlaylist,
    onGetVideos,
    videos,
  } = props;

  // State local
  const [changePage, setChangePage] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [checkName, setCheckName] = useState("");
  const [checkDesc, setCheckDesc] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [valueButton, setValueButton] = useState("");
  const [characters, updateCharacters] = useState(playlists);
  const [checkedItems, setChekedItems] = useState([]);
  const [modalSave, setModalSave] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [dragVIdeo, updateDragVideo] = useState(videosByPlaylist);
  const [getPlaylist, setGetPlaylist] = useState(null);

  // Vallues
  const defaultChannel = JSON.parse(localStorage.getItem("channel"));
  const item = characters?.filter((c) => c.id === checkedItems[0]);
  const itemVideos = dragVIdeo?.filter((v) => v.id === checkedItems[0]);

  // Handle event

  // Change page on click Create Playlist || Edit Playlist
  const toForm = (e) => {
    const nameButton = e.target.value;
    switch (nameButton) {
      case "editPlaylist":
        setEditName(item[0].name);
        setEditDescription(item[0].description);
        setCheckName(item[0].name);
        setCheckDesc(item[0].description);
        setChangePage(true);
        break;
      case "newPlaylist":
        setChangePage(true);
        break;
      case "editVideo":
      case "newVideo":
        setEditName(itemVideos[0]?.vimeo_name);
        setEditDescription(JSON.parse(itemVideos[0].description)["EN"] || "");
        setCheckName(itemVideos[0].vimeo_name);
        setCheckDesc(JSON.parse(itemVideos[0].description)["EN"] || "");
        setChangePage(true);
        break;
    }
    setValueButton(nameButton);
  };

  // Toggle modal window (DELETE)
  const toggleDelete = () => {
    setModalDelete(!modalDelete);
    item.length === 0
      ? setCheckName(itemVideos[0].vimeo_name)
      : setCheckName(item[0].name);
  };

  // Toggle tab (LEFT PANEL)
  const toggleTab = (tab) => {
    if (checkName !== editName || checkDesc !== editDescription) {
      setModalSave(!modalSave);
    } else {
      if (activeTab !== tab) {
        setActiveTab(tab);
      }
      setChangePage(false);
      setChekedItems([]);
    }
  };

  // Drag playlist or videos
  function handleOnDragEnd(result, items, setItems) {
    if (!result.destination) return;

    const getItems = Array.from(items);
    const [reorderedItem] = getItems.splice(result.source.index, 1);
    getItems.splice(result.destination.index, 0, reorderedItem);

    setItems(getItems);
  }

  // Set & remove checkmark
  const handleChange = (p, checkItems, setCheckItems) => {
    const clickedCategory = checkItems.indexOf(p.id);
    const all = [...checkItems];

    if (clickedCategory === -1) {
      all.push(p.id);
    } else {
      all.splice(clickedCategory, 1);
    }
    setCheckItems(all);
  };

  useEffect(() => {
    if (defaultChannel !== props.activeChannel) {
      setChekedItems([]);
    }
  }, [props.activeChannel]);

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
                    {...{ activeTab, toggleTab, characters, dragVIdeo }}
                  />
                </CardBody>
              </Card>
            </Col>
            {/* RIGHT PANEL */}
            <Col xs="12" sm="7" md="8" lg="9">
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <TabPanel
                    {...{
                      characters,
                      dragVIdeo,
                      updateDragVideo,
                      checkedItems,
                      checkName,
                      setCheckName,
                      setCheckDesc,
                      setChekedItems,
                      handleOnDragEnd,
                      handleChange,
                      videosByPlaylist,
                      changePage,
                      setChangePage,
                      editName,
                      editDescription,
                      setEditName,
                      setEditDescription,
                      valueButton,
                      onUpdateVideo,
                      onAddVideoToPlaylist,
                      onGetVideosByPlaylist,
                      getPlaylist,
                      setGetPlaylist,
                      onRemoveVideoFromPlaylist,
                      onGetVideos,
                      videos,
                      modalSave,
                      setModalSave,
                      updateCharacters,
                      item,
                      modalDelete,
                      toggleDelete,
                      onPlaylistDelete,
                      activeChannel,
                      onAddPlaylist,
                      onGetPlaylist,
                      onUpdatePlaylist,
                      activeTab,
                      toForm,
                      defaultChannel,
                      playlists
                    }}
                  />
                </TabPane>
                <TabPane tabId="2">
                  <TabPanel
                    {...{
                      characters,
                      dragVIdeo,
                      updateDragVideo,
                      checkedItems,
                      checkName,
                      setCheckName,
                      setCheckDesc,
                      setChekedItems,
                      handleOnDragEnd,
                      handleChange,
                      videosByPlaylist,
                      changePage,
                      setChangePage,
                      editName,
                      editDescription,
                      setEditName,
                      setEditDescription,
                      valueButton,
                      onUpdateVideo,
                      onAddVideoToPlaylist,
                      onGetVideosByPlaylist,
                      getPlaylist,
                      setGetPlaylist,
                      onRemoveVideoFromPlaylist,
                      onGetVideos,
                      videos,
                      modalSave,
                      setModalSave,
                      updateCharacters,
                      item,
                      modalDelete,
                      toggleDelete,
                      onPlaylistDelete,
                      activeChannel,
                      onAddPlaylist,
                      onGetPlaylist,
                      onUpdatePlaylist,
                      activeTab,
                      toForm,
                      defaultChannel,
                      playlists
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

// Get redux state values
const mapStatetoProps = (state) => ({
  playlists: selectors.playlists.playlists(state),
  activeChannel: selectors.channels.activeChannel(state),
  onePlayist: selectors.playlists.onePlaylist(state),
  videos: selectors.videos.videos(state),
  videosByPlaylist: selectors.videos.videosByPlaylist(state),
});

// Get redux state function
const mapDispatchToProps = (dispatch) => ({
  onAddPlaylist: (data) => dispatch(Actions.playlists.addPlaylistRequest(data)),
  onPlaylistDelete: (data) =>
    dispatch(Actions.playlists.deletePlaylistRequest(data)),
  onUpdatePlaylist: (data) =>
    dispatch(Actions.playlists.updatePlaylistRequest(data)),
  onGetPlaylist: (data) =>
    dispatch(Actions.playlists.getPlaylistsRequest(data)),
  onGetOnePlaylist: (data) =>
    dispatch(Actions.playlists.getOnePlaylistRequest(data)),

  onUpdateVideo: (data) => dispatch(Actions.videos.updateVideoRequest(data)),
  onAddVideoToPlaylist: (data) =>
    dispatch(Actions.videos.addVideoToPlaylistRequest(data)),
  onGetVideosByPlaylist: (data) =>
    dispatch(Actions.videos.getVideoByPlaylistRequest(data)),
  onRemoveVideoFromPlaylist: (data) =>
    dispatch(Actions.videos.removeVideoFromPlaylistRequest(data)),
  onGetVideos: () => dispatch(Actions.videos.getVideosRequest()),
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withNamespaces()(Content));
