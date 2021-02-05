import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { showRightSidebarAction, toggleLeftmenu } from "../../store/actions";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button,
} from "reactstrap";
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import logo from "../../assets/images/bring-stream_logo-wite.png";
import { connect } from "react-redux";
import Actions from "../../store/actions";
import selectors from "../../selectors";
import { withNamespaces } from "react-i18next";
import "./styles.scss";

const Header = (props) => {
  const [menu, setMenu] = useState(false);
  const {
    channels,
    activeChannel,
    setActiveChannel,
    onGetChannels,
    onGetPlaylist,
    onUpdateChannelLanguages,
    channelLanguages,
    onGetChannelLanguages,
    languagesAll,
    getLanguages,
  } = props;
  let defaultChannel = JSON.parse(localStorage.getItem("channel"));
  // set default channel
  useEffect(() => {
    if (channels === null) {
      onGetChannels();
    }
    if (activeChannel && defaultChannel && defaultChannel?.name !== activeChannel?.name) {
      localStorage.setItem("channel", JSON.stringify(activeChannel));
      onGetPlaylist({ id: activeChannel?.id || "1", count: 0 });
    }
    if (channels && defaultChannel !== null) {
      defaultChannel = JSON.parse(localStorage.getItem("channel"));
      setActiveChannel(defaultChannel);
      onGetChannelLanguages(defaultChannel.id);
      getLanguages();
    }
    if(channels && defaultChannel === null) {
      localStorage.setItem("channel", JSON.stringify(channels[0]));
      setActiveChannel(channels[0]);
      onGetPlaylist({ id: activeChannel?.id || "1", count: 0 });
    }
  }, [channels, activeChannel, defaultChannel]);

  // Set default eng lang
  useEffect(() => {
    if(defaultChannel && channelLanguages !== null) {
      if(channelLanguages.length === 0 || channelLanguages["en"] === 0 || !("en" in channelLanguages)) {
        const all = { ...channelLanguages };

        all["en"] = 1;
        
        onUpdateChannelLanguages({ channelId: defaultChannel.id, languages: all });
        setTimeout(() => {
          onGetChannelLanguages(defaultChannel.id);
        }, 1000);
      }
    }
  }, [channelLanguages, defaultChannel])


  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const mapChannelsSelect = () => {
    if (channels === null || channels?.length === 0) {
      return (
        <Link to="/channels/create">
          <Button color="secondary" outline className="waves-effect">
            <i className="bx bx-plus font-size-16 align-middle mr-2" />
            Creacte a new project
          </Button>
        </Link>
      );
    } else {
      return (
        <>
          <Dropdown isOpen={menu} toggle={() => setMenu(!menu)}>
            <DropdownToggle outline color="secondary" caret>
              {activeChannel?.name} <i className="mdi mdi-chevron-down" />
            </DropdownToggle>
            <DropdownMenu>
              {channels?.map((item) => (
                <Link to="/dashboard" key={item.id}>
                  {" "}
                  <DropdownItem
                    onClick={() => {
                      setActiveChannel(item);
                      localStorage.setItem("channel", JSON.stringify(item));
                      setTimeout(() => {
                        window.location.reload();
                      }, 100);
                    }}
                  >
                    {item.name}
                  </DropdownItem>
                </Link>
              ))}

              <DropdownItem>
                <Link to="/channels/create">
                  <i className="bx bx-plus font-size-16 align-middle mr-2" />
                  Creacte a new project
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {activeChannel?.url_bs && (
            <a
              className="visite-site-link"
              href={activeChannel?.url_bs}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button color="secondary" outline className="btn-sm">
                Visit Site
              </Button>
            </a>
          )}
        </>
      );
    }
  };

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/dashboard" className="logo">
                <img src={logo} alt="" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
              data-toggle="collapse"
              onClick={() => {
                props.toggleLeftmenu(!props.leftMenu);
              }}
              data-target="#topnav-menu-content"
            >
              <i className="fa fa-fw fa-bars"></i>
            </button>

            <div className="header-buttons-wrapper">{mapChannelsSelect()}</div>
          </div>
          <div className="d-flex">
            <LanguageDropdown />

            <div className="dropdown d-none d-lg-inline-block ml-1">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                onClick={() => {
                  toggleFullscreen();
                }}
                data-toggle="fullscreen"
              >
                <i className="bx bx-fullscreen"></i>
              </button>
            </div>

            <ProfileMenu />

            {/* <div className="dropdown d-inline-block">
                <button
                  onClick={() => { props.showRightSidebarAction(!props.showRightSidebar); }}
                  type="button"
                  className="btn header-item noti-icon right-bar-toggle waves-effect" >
                  <i className="bx bx-cog bx-spin"></i>
                </button>
              </div> */}
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu } = state.Layout;
  return {
    layoutType,
    showRightSidebar,
    leftMenu,
    channels: selectors.channels.channels(state),
    activeChannel: selectors.channels.activeChannel(state),
    channelLanguages: selectors.languages.channelLanguages(state),
    languagesAll: selectors.languages.languagesAll(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  showRightSidebarAction: (value) => dispatch(showRightSidebarAction(value)),
  toggleLeftmenu: (value) => dispatch(toggleLeftmenu(value)),
  onGetChannels: () => dispatch(Actions.channels.getChannelsRequest()),
  setActiveChannel: (data) => dispatch(Actions.channels.setActiveChannel(data)),
  onGetPlaylist: (data) =>
    dispatch(Actions.playlists.getPlaylistsRequest(data)),

  getLanguages: () => dispatch(Actions.languages.getLanguagesRequest()),
  onGetChannelLanguages: (data) =>
    dispatch(Actions.languages.getChannelLanguagesRequest(data)),
  onUpdateChannelLanguages: (data) =>
    dispatch(Actions.languages.updateChannelLanguagesRequest(data)),
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withNamespaces()(Header));
