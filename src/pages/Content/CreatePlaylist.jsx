import React, { useEffect, useState } from "react";
import "./content.scss";
import classnames from "classnames";
import i18n from "../../i18n";
import { validate } from "./../../helpers/validation";
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
} from "availity-reactstrap-validation";
import {
  TabContent,
  TabPane,
  Nav,
  Card,
  CardBody,
  CardTitle,
  NavItem,
  NavLink,
  Button,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  Form,
  CardSubtitle,
} from "reactstrap";
import Select from "react-select";

const CreatePlaylist = (props) => {
  const { onAddPlaylist, activeChannel, setnewPlaylist, onGetPlaylist } = props;

  const [activeTab, setActiveTab] = useState("2");
  const [playlistName, setplaylistName] = useState("");
  const [playlistDescription, setplaylistDescription] = useState("");
  const [lng, setLng] = useState("English");

  function changeLanguageAction(lng) {
    //set language as i18n
    i18n.changeLanguage(lng);

    if (lng === "sp") {
      setLng("Spanish");
    } else if (lng === "gr") {
      setLng("German");
    } else if (lng === "rs") {
      setLng("Russian");
    } else if (lng === "it") {
      setLng("Italian");
    } else if (lng === "eng") {
      setLng("English");
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    onAddPlaylist({
      name: playlistName,
      description: playlistDescription,
      channel_id: activeChannel.id,
    });
    // setnewPlaylist(false);
    onGetPlaylist();
  }

  const toggleCustomJustified = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    if (activeChannel) {
      setplaylistName(playlistName);
      // setChannelDomain(playlistDescription)
    }
  }, [activeChannel]);

  const customValidation = (value) => {
    return validate.isChannelNameValid(value)
      ? true
      : `The field must not contain spaces.`;
  };

  return (
    <TabContent>
      <TabPane>
        <Card>
          <CardBody>
            <Nav tabs className="nav-tabs-custom nav-justified">
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: activeTab === "1",
                  })}
                  onClick={() => {
                    changeLanguageAction("rs");
                    toggleCustomJustified("1");
                  }}
                >
                  <span className="d-none d-sm-block">Russian</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: activeTab === "2",
                  })}
                  onClick={() => {
                    changeLanguageAction("eng");
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
                    changeLanguageAction("it");
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
                    changeLanguageAction("gr");
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
                    changeLanguageAction("sp");
                    toggleCustomJustified("5");
                  }}
                >
                  <span className="d-none d-sm-block">Espanol</span>
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
              <TabPane tabId="1" className="p-3"></TabPane>
              <TabPane tabId="2" className="p-3"></TabPane>
              <TabPane tabId="3" className="p-3"></TabPane>
              <TabPane tabId="4" className="p-3"></TabPane>
              <TabPane tabId="5" className="p-3"></TabPane>
            </TabContent>
            <AvForm onValidSubmit={customValidation}>
              <AvField
                name="title"
                className="form-control"
                placeholder="title"
                type="text"
                required
                label="Title"
                value={playlistName}
                onChange={(e) => {
                  setplaylistName(e.target.value);
                }}
                validate={{ customValidation }}
              />
              <AvField
                className="form-control"
                type="textarea"
                rows="5"
                label="Description"
                name="description"
                required
                placeholder="description"
                value={playlistDescription}
                onChange={(e) => {
                  setplaylistDescription(e.target.value);
                }}
              />
              <AvField
                className="form-control"
                type="select"
                label="Playlist"
                name="playlist"
                placeholder="Choose..."
                required
                isMulti
              ></AvField>
            </AvForm>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle>Meta Data</CardTitle>
            <CardSubtitle className="mb-3">
              Fill all information below
            </CardSubtitle>

            <AvForm>
              <Row>
                <Col sm={6}>
                  <AvField
                    id="metatitle"
                    label="Meta title"
                    name="productname"
                    required
                    type="text"
                    className="form-control"
                  />
                  <AvField
                    label="Meta Keyword"
                    id="metakeywords"
                    name="manufacturername"
                    required
                    type="text"
                    className="form-control"
                  />
                </Col>

                <Col sm={6}>
                    <AvField
                    label="Meta Description"
                    type="textarea"
                      className="form-control"
                      id="metadescription"
                      required
                      name="Meta Description"
                      rows="5"
                    />
                </Col>
              </Row>
                <FormGroup>
                <Button
                type="submit"
                color="primary"
                className="mr-1 waves-effect waves-light"
              >
                Save Changes
              </Button>
              <Button
                onClick={() => setnewPlaylist(false)}
                type="button"
                color="secondary"
                className="waves-effect"
              >
                Cancel
              </Button>
                </FormGroup>
            </AvForm>
          </CardBody>
        </Card>
      </TabPane>
    </TabContent>
  );
};

export default CreatePlaylist;
