import React, { useEffect, useState } from "react";
import "../content.scss";
import classnames from "classnames";
import i18n from "../../../i18n";
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
  Modal,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import ModalBody from "reactstrap/lib/ModalBody";
import videos from "../../../helpers/api/videos";
const CreateVideo = (props) => {
  // Get props
  const {
    setChangeVideo,
    valueButtonVideos,
    setCheckNameVideos,
    checkIdVideos,
    modalSave,
    setModalSave,
    editNameVideos,
    setEditNameVideos,
    editDescriptionVideos,
    setEditDescriptionVideos,
    setChekedItemsVideos,
    onGetVideos,
    onUpdateVideo,
    onAddVideoToPlaylist,
    characters,
    videos
  } = props;
  // State local
  const [activeTab, setActiveTab] = useState("2");
  const [lng, setLng] = useState("eng");
  const [require, setRequire] = useState(false);
  const [playlistId, setPlaylistId] = useState(characters[0].id);

  // Handle event

  // On submit
  function onSubmit() {
    if (editNameVideos === "" || editDescriptionVideos === "") {
      setRequire(true);
    } else {
      if (valueButtonVideos === "editVideo") {
        onUpdateVideo({ id: checkIdVideos, name: editNameVideos });
      } else {
        onAddVideoToPlaylist({
          playlist_id: playlistId,
          video_id: checkIdVideos,
        });
      }
      setChekedItemsVideos([]);
      setCheckNameVideos("");
      setChangeVideo(false);
      onGetVideos();
    }
  }

  // Modal window (Save changes)
  const toggleSave = () => {
    setModalSave(!modalSave);
  };

  // On chnage global function
  const onChanged = (setName) => (e) => {
    setName(e.target.value);
  };

  // On toggle languages
  const toggleCustomJustified = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const getPlailistId = (e) => {
    const name = e.target.value;
    const arr = characters?.filter((c => c.name == name))
    const id = arr[0]?.id;
    setPlaylistId(id);
  };

  // Side effects
  useEffect(() => {
    i18n.changeLanguage(lng);
  }, [lng]);

  return (
    <TabContent>
      <TabPane>
        <Card>
          <AvForm onValidSubmit={onSubmit}>
            <CardBody>
              {/* Toggle languages */}
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
              {/* Buttons fot toggle */}
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1" className="p-3"></TabPane>
                <TabPane tabId="2" className="p-3"></TabPane>
                <TabPane tabId="3" className="p-3"></TabPane>
                <TabPane tabId="4" className="p-3"></TabPane>
                <TabPane tabId="5" className="p-3"></TabPane>
              </TabContent>
              {/* Modal window (Save changes) */}
              <Modal isOpen={modalSave} toggle={toggleSave}>
                <ModalHeader toggle={toggleSave}>Are you sure?</ModalHeader>
                <ModalBody>
                  You have unsaved data. You want to leave the page?
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="secondary"
                    className="w-sm"
                    onClick={toggleSave}
                  >
                    Cancel
                  </Button>
                  <Button color="danger" className="w-sm" onClick={onSubmit}>
                    Save Changes
                  </Button>
                </ModalFooter>
              </Modal>
              {/* Form group with validation */}
              <FormGroup className="w-50">
                <AvField
                  name="title"
                  className="form-control"
                  placeholder="title"
                  type="text"
                  required={require}
                  label="Title"
                  value={editNameVideos}
                  onChange={onChanged(setEditNameVideos)}
                />
                <AvField
                  className="form-control"
                  type="textarea"
                  rows="5"
                  label="Description"
                  name="description"
                  required={require}
                  placeholder="description"
                  value={editDescriptionVideos}
                  onChange={onChanged(setEditDescriptionVideos)}
                />
                <AvField
                  type="select"
                  name="select"
                  label="Option"
                  helpMessage="Please, chose playlist"
                  vlaue={playlistId}
                  onChange={(e) => getPlailistId(e)}
                >
                  {characters.map((c) => {
                    return <option key={c.id}>{c.name}</option>;
                  })}
                </AvField>
              </FormGroup>
            </CardBody>
            <CardBody>
              <CardTitle>Meta Data</CardTitle>
              <CardSubtitle className="mb-3">
                Fill all information below
              </CardSubtitle>
              {/* Form group without validation */}
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
                    setChekedItemsVideos([]);
                    setChangeVideo(false);
                    setCheckNameVideos("");
                    setEditNameVideos("");
                    setEditDescriptionVideos("");
                    setChangeVideo(false);
                  }}
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

export default CreateVideo;
