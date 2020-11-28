import React, { useEffect, useState } from "react";
import "./content.scss";
import classnames from "classnames";
import i18n from "../../i18n";
import { AvForm, AvField } from "availity-reactstrap-validation";
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
  CardSubtitle,
} from "reactstrap";

const CreatePlaylist = (props) => {
  const {
    onAddPlaylist,
    onUpdatePlaylist,
    activeChannel,
    setChangePlaylist,
    onGetPlaylist,
    valueButton,
    setCheck,
    check,
  } = props;

  const [activeTab, setActiveTab] = useState("2");
  const [playlistName, setplaylistName] = useState("");
  const [playlistDescription, setplaylistDescription] = useState("");
  const [lng, setLng] = useState("English");
  const [editName, setEditName] = useState(check?.name || "");
  const [editDescription, setEditDescription] = useState(
    check?.description || ""
  );

  function onSubmit() {
    if (valueButton === "edit") {
      onUpdatePlaylist({ id: check?.id, name: editName });

      if (check?.name !== playlistName) {
        setCheck("");
        onGetPlaylist();
      }
    } else {
      onAddPlaylist({
        name: playlistName,
        description: playlistDescription,
        channel_id: activeChannel.id,
      });
    }
    setChangePlaylist(false);
    onGetPlaylist();
  }

  const name = (e) => {
    if (valueButton === "edit") {
      setEditName(e.target.value);
    } else {
      setplaylistName(e.target.value);
    }
  };

  const description = (e) => {
    if (valueButton === "edit") {
      setEditDescription(e.target.value);
    } else {
      setplaylistDescription(e.target.value);
    }
  };

  const toggleCustomJustified = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng]);

  return (
    <TabContent>
      <TabPane>
        <Card>
          <AvForm onValidSubmit={onSubmit}>
            <CardBody>
              <Nav tabs className="nav-tabs-custom nav-justified">
                <NavItem>
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
                </NavItem>
                <NavItem>
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
                </NavItem>
              </Nav>

              <TabContent activeTab={activeTab}>
                <TabPane tabId="1" className="p-3"></TabPane>
                <TabPane tabId="2" className="p-3"></TabPane>
                <TabPane tabId="3" className="p-3"></TabPane>
                <TabPane tabId="4" className="p-3"></TabPane>
                <TabPane tabId="5" className="p-3"></TabPane>
              </TabContent>
              <FormGroup className="w-50">
                <AvField
                  name="title"
                  className="form-control"
                  placeholder="title"
                  type="text"
                  required
                  label="Title"
                  value={valueButton === "edit" ? editName : playlistName}
                  onChange={(e) => {
                    name(e);
                  }}
                />
                <AvField
                  className="form-control"
                  type="textarea"
                  rows="5"
                  label="Description"
                  name="description"
                  required
                  placeholder="description"
                  value={
                    valueButton === "edit"
                      ? editDescription
                      : playlistDescription
                  }
                  onChange={(e) => {
                    description(e);
                  }}
                />
                <AvField
                  className="form-control"
                  type="select"
                  label="Playlist"
                  name="playlist"
                  placeholder="Choose..."
                ></AvField>
              </FormGroup>
            </CardBody>
            <CardBody>
              <CardTitle>Meta Data</CardTitle>
              <CardSubtitle className="mb-3">
                Fill all information below
              </CardSubtitle>
              <FormGroup>
                <Row>
                  <Col sm={6}>
                    <AvField
                      id="metatitle"
                      label="Meta title"
                      name="productname"
                      type="text"
                      className="form-control"
                    />
                    <AvField
                      label="Meta Keyword"
                      id="metakeywords"
                      name="manufacturername"
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
                      name="Meta Description"
                      rows="5"
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Button
                  type="submit"
                  color="primary"
                  className="mr-1 waves-effect waves-light"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => {
                    setCheck('');
                    setChangePlaylist(false)}}
                  type="button"
                  color="secondary"
                  className="waves-effect"
                >
                  Cancel
                </Button>
              </FormGroup>
            </CardBody>
          </AvForm>
        </Card>
      </TabPane>
    </TabContent>
  );
};

export default CreatePlaylist;
