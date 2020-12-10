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
import Playlists from "./Playlists/Playlists";
import Videos from "./Videos/Videos";
import TabButton from "./TabButton/TabButton";

const Content = (props) => {
  // Get props
  const {
    playlists,
    activeChannel,
    videos,
    onAddPlaylist,
    onPlaylistDelete,
    onUpdatePlaylist,
    onGetPlaylist,
    onGetVideos,
    onUpdateVideo,
    onAddVideoToPlaylist,
  } = props;

  // State local
  // Playlists state
  const [changePlaylist, setChangePlaylist] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [checkName, setCheckName] = useState("");
  const [activeTab, setActiveTab] = useState("2");
  const [valueButton, setValueButton] = useState("");
  const [characters, updateCharacters] = useState(playlists);
  const [checkedItems, setChekedItems] = useState([]);
  const [modalSave, setModalSave] = useState(false);
  const [editNamePlaylist, setEditNamePlaylist] = useState("");
  const [editDescriptionPlaylist, setEditDescriptionPlaylist] = useState("");

  // Videos state
  const [changeVideos, setChangeVideo] = useState(false);
  const [editNameVideos, setEditNameVideos] = useState("");
  const [editDescriptionVideos, setEditDescriptionVideos] = useState("");
  const [checkNameVideos, setCheckNameVideos] = useState("");
  const [valueButtonVideos, setValueButtonVideos] = useState("");
  const [checkedItemsVideos, setChekedItemsVideos] = useState([]);
  const [modalDeleteVideos, setModalDeleteVideos] = useState(false);
  const [dragVIdeo, updateDragVideo] = useState(videos)

  // Vallues
  const defaultChannel = JSON.parse(localStorage.getItem("channel"));
  const item = characters?.filter((c) => c.id === checkedItems[0]);
  const itemVideos = dragVIdeo?.filter(
    (v) => v.id === checkedItemsVideos[0]
  );

  // Handle event

  // Change page on click Create Playlist || Edit Playlist
  const changePagePlaylist = (e) => {
    const nameButton = e.target.value;
    if (nameButton === "editPlaylist") {
      setEditNamePlaylist(item[0].name);
      setEditDescriptionPlaylist(item[0].description);
      setCheckName(item[0].name);
      setChangePlaylist(true);
      setValueButton(nameButton);
    } else {
      setChangePlaylist(true);
      setValueButton(nameButton);
    }
  };

  // Change page on click Add video || Edit video
  const changePageVideo = (e) => {
    const nameButton = e.target.value;
      setEditNameVideos(itemVideos[0]?.vimeo_name);
      setEditDescriptionVideos(JSON.parse(itemVideos[0].description)["EN"]);
      setCheckNameVideos(itemVideos[0].name);
      setChangeVideo(true);
      setValueButtonVideos(nameButton);
  };

  // Toggle modal window (DELETE)
  const toggleDelete = () => {
    setModalDelete(!modalDelete);
    setCheckName(item[0].name);
  };

  const toggleDeleteVideos = () => {
    setModalDeleteVideos(!modalDeleteVideos);
    setCheckNameVideos(itemVideos[0].vimeo_name);
  };

  // Toggle tab (LEFT PANEL)
  const toggleTab = (tab) => {
    if (checkName !== editNamePlaylist) {
      setModalSave(!modalSave);
    } else {
      if (activeTab !== tab) {
        setActiveTab(tab);
        setChangePlaylist(false);
        setChangeVideo(false);
        setChekedItems([]);
        setChekedItemsVideos([]);
      }
      setChangePlaylist(false);
      setChangeVideo(false);
      setChekedItems([]);
      setChekedItemsVideos([]);
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
                    {...{ activeTab, toggleTab, characters, videos }}
                  />
                </CardBody>
              </Card>
            </Col>
            {/* RIGHT PANEL */}
            <Col xs="12" sm="7" md="8" lg="9">
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Playlists
                    {...{
                      characters,
                      changePagePlaylist,
                      checkedItems,
                      toggleDelete,
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
                      onAddPlaylist,
                      onUpdatePlaylist,
                      changePlaylist,
                      setChangePlaylist,
                      valueButton,
                      editNamePlaylist,
                      setEditNamePlaylist,
                      editDescriptionPlaylist,
                      setEditDescriptionPlaylist,
                      modalSave,
                      setModalSave,
                    }}
                  />
                </TabPane>
                <TabPane tabId="2">
                  <Videos
                    {...{
                      characters,
                      dragVIdeo,
                      updateDragVideo,
                      changePageVideo,
                      checkedItemsVideos,
                      checkNameVideos,
                      setCheckNameVideos,
                      setChekedItemsVideos,
                      handleOnDragEnd,
                      handleChange,
                      videos,
                      onGetVideos,
                      setChangeVideo,
                      modalDeleteVideos,
                      toggleDeleteVideos,
                      changeVideos,
                      editNameVideos,
                      setEditNameVideos,
                      editDescriptionVideos,
                      setEditDescriptionVideos,
                      valueButtonVideos,
                      onUpdateVideo,
                      onAddVideoToPlaylist,
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

  onGetVideos: () => dispatch(Actions.videos.getVideosRequest()),
  onUpdateVideo: (data) => dispatch(Actions.videos.updateVideoRequest(data)),
  onAddVideoToPlaylist: (data) =>
    dispatch(Actions.videos.addVideoToPlaylistRequest(data)),
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withNamespaces()(Content));
