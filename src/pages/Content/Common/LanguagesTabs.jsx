import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

const LanguagesTabs = (props) => {
  const {
    setLngEng,
    languagesAll,
    channelLanguages,
    onGetChannelLanguages,
  } = props;
  const [langs, setLangs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const defaultChannel = JSON.parse(localStorage.getItem("channel"));

  // On toggle languages
  const toggleCustomJustified = (tab, title) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
    if (title !== "English") {
      setLngEng(false);
    } else {
      setLngEng(true);
    }
  };

  // Side effects
  useEffect(() => {
    // i18n.changeLanguage(lng);
    setLangs(languagesAll);
    onGetChannelLanguages(defaultChannel.id);
  }, []);

  return (
    <TabContent>
      <TabPane>
        <Nav tabs className="nav-tabs-custom nav-justified">
          {langs?.map((item, index) => {
            const num = index + 1;
            return (
              <>
                {channelLanguages[item.id] === 1 ? (
                  <NavItem key={index}>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: activeTab === num.toString(),
                      })}
                      onClick={() => {
                        //setLng("rs");
                        toggleCustomJustified(num.toString(), item.name);
                      }}
                    >
                      <span className="d-none d-sm-block">{item.name}</span>
                    </NavLink>
                  </NavItem>
                ) : null}
              </>
            );
          })}
        </Nav>
        {/* Buttons fot toggle */}
        <TabContent activeTab={activeTab}>
          {langs?.map((item, index) => {
            return (
              <TabPane key={index} tabId={index + 1} className="p-3"></TabPane>
            );
          })}
        </TabContent>
      </TabPane>
    </TabContent>
  );
};

export default LanguagesTabs;
