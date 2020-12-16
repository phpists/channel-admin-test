import React, { useState, useEffect } from "react";
import classnames from "classnames";
import i18n from "../../../i18n";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

const LanguagesTabs = () => {
  const [activeTab, setActiveTab] = useState("2");
  const [lng, setLng] = useState("eng");
  const [langs, setLangs] = useState([]);

  // On toggle languages
  const toggleCustomJustified = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // Side effects
  useEffect(() => {
    i18n.changeLanguage(lng);
    const data = localStorage.getItem("channelLangs");
    const languages = data.split(',');
    setLangs(languages)
  }, [lng]);

  // console.log(langs);
  // console.log(typeof (langs));

  return (
    <TabContent>
      <TabPane>
        <Nav tabs className="nav-tabs-custom nav-justified">

          {langs.map((item, index) => {
            const num = index + 1
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

          {/* <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={classnames({
                active: activeTab === "1",
              })}
              onClick={() => {
                setLng("rs");
                toggleCustomJustified("1");
              }}
            >
              <span className="d-none d-sm-block">Russian</span>
            </NavLink>
          </NavItem> */}

          {/* <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={classnames({
                active: activeTab === "2",
              })}
              onClick={() => {
                setLng("eng");
                toggleCustomJustified("2");
              }}
            >
              <span className="d-none d-sm-block">English</span>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={classnames({
                active: activeTab === "3",
              })}
              onClick={() => {
                setLng("it");
                toggleCustomJustified("3");
              }}
            >
              <span className="d-none d-sm-block">Italy</span>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={classnames({
                active: activeTab === "4",
              })}
              onClick={() => {
                setLng("gr");
                toggleCustomJustified("4");
              }}
            >
              <span className="d-none d-sm-block">German</span>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              style={{ cursor: "pointer" }}
              className={classnames({
                active: activeTab === "5",
              })}
              onClick={() => {
                setLng("sp");
                toggleCustomJustified("5");
              }}
            >
              <span className="d-none d-sm-block">Espanol</span>
            </NavLink>
          </NavItem> */}
        </Nav>
        {/* Buttons fot toggle */}
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1" className="p-3"></TabPane>
          <TabPane tabId="2" className="p-3"></TabPane>
          <TabPane tabId="3" className="p-3"></TabPane>
          <TabPane tabId="4" className="p-3"></TabPane>
          <TabPane tabId="5" className="p-3"></TabPane>
        </TabContent>
      </TabPane>
    </TabContent>
  );
};

export default LanguagesTabs;
