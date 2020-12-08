import React, { useState } from "react";
import { connect } from "react-redux";
import selectors from "../selectors";
import Actions from "../store/actions";
import { withNamespaces } from "react-i18next";
import Content from "../pages/Content/Content";

const ContentHOC = (props) => {
    // State local
    const [changePlaylist, setChangePlaylist] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [checkName, setCheckName] = useState("");
    const [checkId, setCheckId] = useState("");
    const [activeTab, setActiveTab] = useState("1");
    const [valueButton, setValueButton] = useState("");
    const [characters, updateCharacters] = useState(props.playlists);
    const [checkedItems, setChekedItems] = useState([]);
    const [modalSave, setModalSave] = useState(false);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");

    // Vallues
    const defaultChannel = JSON.parse(localStorage.getItem("channel"));
    const item = characters?.filter((c) => c.id === checkedItems[0]);

    // Handle event

    // Change page on click Create Playlist || Edit
    const changePage = (e) => {
      const nameButton = e.target.value;
      if (nameButton === "edit") {
        setEditName(item[0].name);
        setEditDescription(item[0].description);
        setCheckId(item[0].id);
        setCheckName(item[0].name);
        setChangePlaylist(true);
        setValueButton(nameButton);
      } else {
        setChangePlaylist(true);
        setValueButton(nameButton);
      }
    };

    // Toggle modal window (DELETE)
    const toggleDelete = () => {
      setModalDelete(!modalDelete);
      setCheckId(item[0].id);
      setCheckName(item[0].name);
    };

    // Toggle tab (LEFT PANEL)
    const toggleTab = (tab) => {
      if (checkName !== editName) {
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
          editName,
          setEditName,
          editDescription,
          setEditDescription,
          changePage,
          toggleDelete,
          toggleTab,
          handleOnDragEnd,
          handleChange,
        }} {...props}
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
  errorMessage: (data) => dispatch(Actions.common.setErrorNotify(data)),
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withNamespaces()(ContentHOC));
