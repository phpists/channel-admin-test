import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

const LanguagesTabs = (props) => {
  const {
    languagesAll,
    channelLanguages,
    onGetChannelLanguages,
    getLanguages,
    onePlayist,
    setDescLang,
    descLang,
    editName,
    editDescription,
    metaTitle,
    metaKeyword,
    metaDesc,
    onChangeForma,
    valueButton,
    oneVideo,
    onGetOnePlaylist,
    onGetOneVideo,
  } = props;
  const [langs, setLangs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const defaultChannel = JSON.parse(localStorage.getItem("channel"));
  const [currLang, setCurrLang] = useState("en");

  // On toggle languages
  const toggleCustomJustified = (tab, title) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      onChangeForma(descLang[title]);
      setCurrLang(title);
    }
  };
  // Keep track change on forma
  useEffect(() => {
    if (Object.keys(descLang).length !== 0) {
      if (metaDesc || editName || editDescription || metaTitle || metaKeyword) {
        const arr = descLang;
        arr[currLang] = {
          description: editDescription,
          name: editName,
          seo_description: metaDesc,
          seo_keyword: metaKeyword,
          seo_title: metaTitle,
        };
        setDescLang(arr);
      }
    }
  }, [metaDesc, editName, editDescription, metaTitle, metaKeyword, descLang]);

  // Set selected languages
  useEffect(() => {
    languagesAll && setLangs(languagesAll);
  }, [languagesAll]);
  // Set active lang
  useEffect(() => {
    if(languagesAll !== null && channelLanguages !== null) {
      setActiveTab("17");
    }
  }, [languagesAll, channelLanguages])
  // Set initial values for all languages on form
  useEffect(() => {
    if (Object.keys(descLang).length === 0) {
      const arr = descLang;
      if (
        channelLanguages !== null &&
        onePlayist !== null ||
        oneVideo !== null
      ) {
        for (let key in channelLanguages) {
          if (channelLanguages[key] === 1) {
            if (
              onePlayist?.name === editName || "" === editName &&
              valueButton === "editPlaylist"
            ) {
              if (
                onePlayist?.description.includes(`${key}":`)) {
                arr[key] = JSON.parse(onePlayist.description)[key];
              } else {
                arr[key] = {
                  description: "",
                  name: "",
                  seo_description: "",
                  seo_keyword: "",
                  seo_title: "",
                };
              }
            } else if (valueButton === "newPlaylist") {
              arr[key] = {
                description: "",
                name: "",
                seo_description: "",
                seo_keyword: "",
                seo_title: "",
              };
            } else if (
              (oneVideo?.name === editName || "" === editName &&
                valueButton === "editVideo") ||
              valueButton === "newVideo"
            ) {
              if (
                oneVideo?.description.includes(`${key}":`)
              ) {
                arr[key] = JSON.parse(oneVideo.description)[key];
              } else {
                arr[key] = {
                  description: "",
                  name: "",
                  seo_description: "",
                  seo_keyword: "",
                  seo_title: "",
                };
              }
            }
          }
        }
        setDescLang(arr);
      }
    }
  }, [channelLanguages, onePlayist, descLang, oneVideo, editName]);

  return (
    <TabContent>
      <TabPane>
        <Nav tabs className="nav-tabs-custom nav-justified">
          {langs?.map((item, index) => {
            const num = index + 1;
            return (
              <>
                {channelLanguages && channelLanguages[item.id] === 1 ? (
                  <NavItem key={index}>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: activeTab === num.toString(),
                      })}
                      onClick={() => {
                        toggleCustomJustified(num.toString(), item.id);
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
