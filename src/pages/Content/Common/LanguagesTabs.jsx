import React, { useState, useEffect } from "react";
import classnames from "classnames";
import i18n from "../../../i18n";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

const LanguagesTabs = () => {
  const [activeTab, setActiveTab] = useState("1");
  // const [lng, setLng] = useState("eng");
  const [langs, setLangs] = useState([]);
  const defaultLang = JSON.parse(localStorage.getItem("channelLangs"));

  // On toggle languages
  const toggleCustomJustified = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
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
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: activeTab === num.toString(),
                  })}
                  onClick={() => {
                    //setLng("rs");
                    toggleCustomJustified(num.toString());
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
          {langs.map((item, index) => {
            return <TabPane tabId={index + 1} className="p-3"></TabPane>;
          })}
        </TabContent>
      </TabPane>
    </TabContent>
  );
};

export default LanguagesTabs;
