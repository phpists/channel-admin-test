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
import Upload from "./TabPanel/Upload/Upload";
import TabPanel from "./TabPanel/TabPanel";
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
    countVideos,
    countPlaylists,
    countVideosByPlaylist,
    loader,
    setLoader,
    channelLanguages,
    onGetChannelLanguages,
    languagesAll,
    getLanguages,
    onGetOnePlaylist,
    onePlayist,
    oneVideo,
    onGetOneVideo,
    onChangeVideoOrder,
    onGetPlaylistsByVideo,
    playlistsByVideo
  } = props;

  // State local
  const [changePage, setChangePage] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [checkName, setCheckName] = useState("");
  const [checkId, setCheckId] = useState(null);
  const [checkDesc, setCheckDesc] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [valueButton, setValueButton] = useState("");
  const [characters, updateCharacters] = useState(playlists);
  const [checkedItems, setChekedItems] = useState([]);
  const [modalSave, setModalSave] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [dragVIdeo, updateDragVideo] = useState(videos);
  const [getPlaylist, setGetPlaylist] = useState(null);
  const [selectedPage, setSelectedPage] = useState(1);
  // Meta state value
  const [metaTitle, setMetaTitle] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [metaDesc, setMetaDesc] = useState("");

  // Vallues
  const defaultChannel = JSON.parse(localStorage.getItem("channel"));
  const item = characters?.filter((c) => c.id === checkedItems[0]);
  const itemVideos = dragVIdeo?.filter((v) => v.id === checkedItems[0]);

  // Handle event
  // Change page on click Create Playlist || Edit Playlist
  const toEdit = (p, name) => {
    if (name === "editVideo") {
      setEditName( JSON.parse(p.description)["en"]["name"] || "");
      setEditDescription(JSON.parse(p.description)["en"]["description"] || "");
      setMetaTitle(
        JSON.parse(p.description)["en"]["seo_title"] || ""
    );
    setMetaKeyword(
        JSON.parse(p.description)["en"]["seo_keyword"] || ""
    );
    setMetaDesc(
        JSON.parse(p.description)["en"]["seo_description"] || ""
    );
      setCheckName(JSON.parse(p.description)["en"]["name"] || "");
      setCheckDesc(JSON.parse(p.description)["en"]["description"] || "");
      setCheckId(p.id);
      setChangePage(true);
      onGetPlaylistsByVideo({channel: defaultChannel?.id, video_id: p.id})
    } else {
      setEditName(
          JSON.parse(p.description)["en"]["name"] || ""
      );
      setEditDescription(
          JSON.parse(p.description)["en"]["description"] || ""
      );
      setMetaTitle(
          JSON.parse(p.description)["en"]["seo_title"] || ""
      );
      setMetaKeyword(
          JSON.parse(p.description)["en"]["seo_keyword"] || ""
      );
      setMetaDesc(
          JSON.parse(p.description)["en"]["seo_description"] || ""
      );
      setCheckName(p.name);
      setCheckDesc(
          JSON.parse(p.description)["en"]["description"] || ""
      );
      setCheckId(p.id);
      setChangePage(true);
    }
    setValueButton(name);
    
  };

  const toForm = (e) => {
    const nameButton = e.target.value;
    switch (nameButton) {
      case "editPlaylist":
        setEditName(
          JSON.parse(item[0].description)["en"]["name"] || ""
      );
      setEditDescription(
          JSON.parse(item[0].description)["en"]["description"] || ""
      );
      setMetaTitle(
          JSON.parse(item[0].description)["en"]["seo_title"] || ""
      );
      setMetaKeyword(
          JSON.parse(item[0].description)["en"]["seo_keyword"] || ""
      );
      setMetaDesc(
          JSON.parse(item[0].description)["en"]["seo_description"] || ""
      );
      setCheckName(item[0].name);
      setCheckDesc(
          JSON.parse(item[0].description)["en"]["description"] || ""
      );
        setCheckId(item[0].id);
        onGetOnePlaylist({ id: item[0].id });
        break;
      case "newPlaylist":
        setEditName("");
        setEditDescription("");
        setMetaTitle("");
        setMetaKeyword("");
        setMetaDesc("");
        setCheckName("");
        setEditDescription("");
        setCheckId("");
        break;
      case "editVideo":
      case "newVideo":
        setEditName( JSON.parse(itemVideos[0].description)["en"]["name"] || "");
        setEditDescription(JSON.parse(itemVideos[0].description)["en"]["description"] || "");
        setMetaTitle(
          JSON.parse(itemVideos[0].description)["en"]["seo_title"] || ""
      );
      setMetaKeyword(
          JSON.parse(itemVideos[0].description)["en"]["seo_keyword"] || ""
      );
      setMetaDesc(
          JSON.parse(itemVideos[0].description)["en"]["seo_description"] || ""
      );
        setCheckName(JSON.parse(itemVideos[0].description)["en"]["name"] || "");
        setCheckDesc(JSON.parse(itemVideos[0].description)["en"]["description"] || "");
        setCheckId(itemVideos[0].id);
        onGetOneVideo({id: itemVideos[0].id})
        onGetPlaylistsByVideo({channel: defaultChannel?.id, video_id: itemVideos[0].id})
        break;
      default:
        break;
    }
    setValueButton(nameButton);
    setChangePage(true);
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
      setSelectedPage(1);
      onGetPlaylist({ id: defaultChannel?.id, count: 0 });
      onGetVideos({ id: defaultChannel?.id, count: 0 });
    }
  };

  // Drag playlist or videos
  function handleOnDragEnd(result, items) {
    if (!result.destination) return;

    const getItems = Array.from(items);
    const [reorderedItem] = getItems.splice(result.source.index, 1);
    getItems.splice(result.destination.index, 0, reorderedItem);
    const currentItem = getItems[result.destination.index];

    setLoader(true);

    if(activeTab === "1") {
      onUpdatePlaylist({
        id: currentItem.id,
        name: currentItem.name,
        description: currentItem.description,
        orderby: (getItems[result.destination.index + 1].orderby - 1)
      });
      setTimeout(() => {
        onGetPlaylist({ id: defaultChannel.id, count: 0 });
      }, 1000);
      updateCharacters(null);
    } else {
      onChangeVideoOrder({
        playlist_id: currentItem.playlist_id,
        video_id: currentItem.id,
        orderby: (getItems[result.destination.index + 1].orderby - 1)
      });
      setTimeout(() => {
        onGetVideosByPlaylist({
          id: getPlaylist?.id,
          channel: defaultChannel?.id,
          count: 0,
        });
      }, 1000);
    }
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
    if (defaultChannel !== activeChannel) {
      setChekedItems([]);
    }
  }, [activeChannel]);

  useEffect(() => {
    if (playlists === null) {
      onGetPlaylist({ id: defaultChannel?.id || "1", count: 0 });
    }
    if (videos === null) {
      onGetVideos({ id: defaultChannel?.id, count: 0 });
    }

    if (
      characters === null ||
      playlists?.length !== characters?.length ||
      checkName == editName
    ) {
      updateCharacters(playlists);
    }
    if (getPlaylist !== null) {
      if (
        dragVIdeo === null ||
        videosByPlaylist?.length !== dragVIdeo?.length ||
        checkName == editName
      ) {
        updateDragVideo(videosByPlaylist);
      }
    } else {
      if (dragVIdeo === null || videos?.length !== dragVIdeo?.length) {
        updateDragVideo(videos);
      }
    }
  }, [playlists, videosByPlaylist, videos, getPlaylist]);


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
                    {...{
                      activeTab,
                      toggleTab,
                      characters,
                      dragVIdeo,
                      countPlaylists,
                      countVideos,
                    }}
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
                      playlists,
                      countVideos,
                      countPlaylists,
                      selectedPage,
                      setSelectedPage,
                      toEdit,
                      setActiveTab,
                      countVideosByPlaylist,
                      checkId,
                      loader,
                      setLoader,
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
                      onGetOnePlaylist,
                      onePlayist,
                      oneVideo,
                      onGetOneVideo,
                      onChangeVideoOrder,
                      playlistsByVideo
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
                      playlists,
                      countVideos,
                      countPlaylists,
                      selectedPage,
                      setSelectedPage,
                      toEdit,
                      setActiveTab,
                      countVideosByPlaylist,
                      checkId,
                      loader,
                      setLoader,
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
                      onGetOnePlaylist,
                      onePlayist,
                      oneVideo,
                      onGetOneVideo,
                      onChangeVideoOrder,
                      playlistsByVideo
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
  activeChannel: selectors.channels.activeChannel(state),

  channelLanguages: selectors.languages.channelLanguages(state),
  languagesAll: selectors.languages.languagesAll(state),

  playlists: selectors.playlists.playlists(state),
  onePlayist: selectors.playlists.onePlaylist(state),
  countPlaylists: selectors.playlists.count(state),
  playlistsByVideo: selectors.playlists.playlistsByVideo(state),

  videos: selectors.videos.videos(state),
  videosByPlaylist: selectors.videos.videosByPlaylist(state),
  countVideos: selectors.videos.countVideos(state),
  countVideosByPlaylist: selectors.videos.countVideosByPlaylist(state),
  oneVideo: selectors.videos.oneVideo(state),

  loader: selectors.common.loader(state),
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
  onGetPlaylistsByVideo: (data) => dispatch(Actions.playlists.getPlaylistsByVideoRequest(data)),

  onUpdateVideo: (data) => dispatch(Actions.videos.updateVideoRequest(data)),
  onAddVideoToPlaylist: (data) =>
    dispatch(Actions.videos.addVideoToPlaylistRequest(data)),
  onGetVideosByPlaylist: (data) =>
    dispatch(Actions.videos.getVideoByPlaylistRequest(data)),
  onRemoveVideoFromPlaylist: (data) =>
    dispatch(Actions.videos.removeVideoFromPlaylistRequest(data)),
  onGetVideos: (data) => dispatch(Actions.videos.getVideosRequest(data)),
  onGetOneVideo: (data) => dispatch(Actions.videos.getOneVideoRequest(data)),
  onChangeVideoOrder: (data) => dispatch(Actions.videos.changeVideoOrderRequest(data)),

  onGetChannelLanguages: (data) =>
    dispatch(Actions.languages.getChannelLanguagesRequest(data)),
  getLanguages: () => dispatch(Actions.languages.getLanguagesRequest()),

  setLoader: (data) => dispatch(Actions.common.setLoader(data)),
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withNamespaces()(Content));
