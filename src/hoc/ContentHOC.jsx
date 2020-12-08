import React, { useState } from "react";
import { connect } from "react-redux";
import selectors from "../selectors";
import Actions from "../store/actions";
import { withNamespaces } from "react-i18next";
import Content from "../pages/Content/Content";
import videos from "../selectors/videos";

const ContentHOC = (props) => {
  // State local
  // Playlists state
  const [changePlaylist, setChangePlaylist] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [checkName, setCheckName] = useState("");
  const [checkId, setCheckId] = useState("");
  const [activeTab, setActiveTab] = useState("2");
  const [valueButton, setValueButton] = useState("");
  const [characters, updateCharacters] = useState(props.playlists);
  const [checkedItems, setChekedItems] = useState([]);
  const [modalSave, setModalSave] = useState(false);
  const [editNamePlaylist, setEditNamePlaylist] = useState("");
  const [editDescriptionPlaylist, setEditDescriptionPlaylist] = useState("");

  // Videos state
  const [changeVideos, setChangeVideo] = useState(false);
  const [editNameVideos, setEditNameVideos] = useState("");
  const [editDescriptionVideos, setEditDescriptionVideos] = useState("");
  const [checkNameVideos, setCheckNameVideos] = useState("");
  const [checkIdVideos, setCheckIdVideos] = useState("");
  const [valueButtonVideos, setValueButtonVideos] = useState("");
  const [checkedItemsVideos, setChekedItemsVideos] = useState([]);
  const [modalDeleteVideos, setModalDeleteVideos] = useState(false);

  // Vallues
  const defaultChannel = JSON.parse(localStorage.getItem("channel"));
  const item = characters?.filter((c) => c.id === checkedItems[0]);
  const itemVideos = props.videos?.filter(
    (v) => v.id === checkedItemsVideos[0]
  );

  // Handle event

  // Change page on click Create Playlist || Edit Playlist
  const changePagePlaylist = (e) => {
    const nameButton = e.target.value;
    if (nameButton === "editPlaylist") {
      setEditNamePlaylist(item[0].name);
      setEditDescriptionPlaylist(item[0].description);
      setCheckId(item[0].id);
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
    if (nameButton === "editVideo") {
      setEditNameVideos(itemVideos[0].vimeo_name);
      setEditDescriptionVideos(itemVideos[0].description);
      setCheckIdVideos(itemVideos[0].id);
      setCheckNameVideos(itemVideos[0].name);
      setChangeVideo(true);
      setValueButtonVideos(nameButton);
    } else {
      setChangeVideo(true);
      setValueButtonVideos(nameButton);
    }
  };

  // Toggle modal window (DELETE)
  const toggleDelete = () => {
    setModalDelete(!modalDelete);
    setCheckId(item[0].id);
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
        setChekedItems([]);
      }
      setChangePlaylist(false);
      setChekedItems([]);
    }
  };

  // Drag playlist
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateCharacters(items);
  }

  // Set & remove checkmark
  const handleChange = (p) => {
    const clickedCategory = checkedItems.indexOf(p.id);
    const all = [...checkedItems];

    if (clickedCategory === -1) {
      all.push(p.id);
    } else {
      all.splice(clickedCategory, 1);
    }
    setChekedItems(all);
  };

  const handleChangeVideos = (p) => {
    const clickedCategory = checkedItemsVideos.indexOf(p.id);
    const all = [...checkedItemsVideos];

    if (clickedCategory === -1) {
      all.push(p.id);
    } else {
      all.splice(clickedCategory, 1);
    }
    setChekedItemsVideos(all);
  };

  return (
    <Content
      {...{
        defaultChannel,
        item,
        changePlaylist,
        setChangePlaylist,
        modalDelete,
        setModalDelete,
        checkName,
        setCheckName,
        checkId,
        setCheckId,
        activeTab,
        setActiveTab,
        valueButton,
        setValueButton,
        characters,
        updateCharacters,
        checkedItems,
        setChekedItems,
        modalSave,
        setModalSave,
        editNamePlaylist,
        setEditNamePlaylist,
        editDescriptionPlaylist,
        setEditDescriptionPlaylist,
        changePagePlaylist,
        toggleDelete,
        toggleTab,
        handleOnDragEnd,
        handleChange,
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
        setCheckIdVideos,
        valueButtonVideos,
        setValueButtonVideos,
        checkedItemsVideos,
        setChekedItemsVideos,
        handleChangeVideos,
        itemVideos,
        modalDeleteVideos,
        setModalDeleteVideos,
        toggleDeleteVideos,
      }}
      {...props}
    />
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

  errorMessage: (data) => dispatch(Actions.common.setErrorNotify(data)),
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withNamespaces()(ContentHOC));
