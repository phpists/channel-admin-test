import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Label,
} from "reactstrap";
import { connect } from "react-redux";
import Actions from "../../../store/actions";
import selectors from "../../../selectors";

const SelectLanguages = (props) => {
  const {
    languagesAll,
    getLanguages,
    channelLanguages,
    onGetChannelLanguages,
    onUpdateChannelLanguages,
  } = props;
  // Local state
  const [menu, setMenu] = useState(false);
  const defaultChannel = JSON.parse(localStorage.getItem("channel"));
  // Add languages
  const selectLang = (e) => {
    const name = e.target.name;
    const selected = Object.keys(channelLanguages)?.indexOf(name);
    const all = { ...channelLanguages };

    if (selected === -1) {
      all[name] = 0;
    } else {
      delete all[name];
    }
    onUpdateChannelLanguages({ channelId: defaultChannel.id, languages: all });
    setTimeout(() => {
      onGetChannelLanguages(defaultChannel.id);
    }, 1000);
  };

  //   Keep track side effects --- get all languages
  useEffect(() => {
    getLanguages();
  }, []);
  // Get channel languages
  useEffect(() => {
    defaultChannel && onGetChannelLanguages(defaultChannel.id);
  }, [defaultChannel]);
  return (
    <>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle className="btn header-item waves-effect" tag="button">
          <span className="align-middle">Select languages</span>
        </DropdownToggle>
        <DropdownMenu className="language-switch scrollable-menu" right>
          {languagesAll &&
            languagesAll.map((l, index) => {
              return (
                <DropdownItem tag="a" href="#" className="notify-item" key={index}>
                  <Label
                    check
                    className="d-block ml-4 mt-2 font-weight-bold"
                  >
                    <Input
                      type="checkbox"
                      name={l.id}
                      checked={channelLanguages?.hasOwnProperty(l.id)}
                      onChange={selectLang}
                    />
                    {l.name}
                  </Label>
                </DropdownItem>
              );
            })}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

const mapStateToProps = (state) => ({
  languagesAll: selectors.languages.languagesAll(state),
  channelLanguages: selectors.languages.channelLanguages(state),
});

const mapDispatchToProps = (dispatch) => ({
  getLanguages: () => dispatch(Actions.languages.getLanguagesRequest()),
  onGetChannelLanguages: (data) =>
    dispatch(Actions.languages.getChannelLanguagesRequest(data)),
  onUpdateChannelLanguages: (data) =>
    dispatch(Actions.languages.updateChannelLanguagesRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectLanguages);
