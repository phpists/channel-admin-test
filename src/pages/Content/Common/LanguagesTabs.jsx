import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

const LanguagesTabs = (props) => {
  const { setLngEng } = props;
  const [langs, setLangs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const defaultLang = JSON.parse(localStorage.getItem("channelLangs"));

  // On toggle languages
  const toggleCustomJustified = (tab, title) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
    if(title !== "English") {
      setLngEng(false)
    } else {
      setLngEng(true)
    }
  };

  // Side effects
  useEffect(() => {
    // i18n.changeLanguage(lng);
      setLangs(defaultLang);
  }, []);

  return (
    <TabContent>
      <TabPane>
        <Nav tabs className="nav-tabs-custom nav-justified">
          {langs?.map((item, index) => {
            const num = index + 1;
            return (
              <NavItem key={index}>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: activeTab === num.toString(),
                  })}
                  onClick={() => {
                    //setLng("rs");
                    toggleCustomJustified(num.toString(), item);
                  }}
                >
                  <span className="d-none d-sm-block">{item}</span>
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
        {/* Buttons fot toggle */}
        <TabContent activeTab={activeTab}>
          {langs?.map((item, index) => {
            return <TabPane key={index} tabId={index + 1} className="p-3"></TabPane>;
          })}
        </TabContent>
      </TabPane>
    </TabContent>
  );
};

export default LanguagesTabs;
