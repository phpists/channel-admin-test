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
  Modal,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import ModalBody from "reactstrap/lib/ModalBody";
const CreatePlaylist = (props) => {
  // Get props
  const {
    onAddPlaylist,
    onUpdatePlaylist,
    activeChannel,
    setChangePlaylist,
    onGetPlaylist,
    valueButton,
    setCheckName,
    checkId,
    modalSave,
    editName,
    setEditName,
    editDescription,
    setEditDescription,
    setChekedItems,
    setModalSave,
  } = props;
  // State local
  const [activeTab, setActiveTab] = useState("2");
  const [playlistName, setplaylistName] = useState("");
  const [playlistDescription, setplaylistDescription] = useState("");
  const [lng, setLng] = useState("eng");
  const [require, setRequire] = useState(false);

  // Handle event

  // On submit
  function onSubmit() {
    if (valueButton === "edit") {
      if (editName === "" || editDescription === "") {
        setRequire(true);
      } else {
        onUpdatePlaylist({ id: checkId, name: editName });

        setChangePlaylist(false);
        onGetPlaylist({ id: activeChannel.id });
        setChekedItems([]);
        setCheckName("");
        setEditName("");
        setEditDescription("");
      }
    } else {
      if (playlistName === "" || playlistDescription === "") {
        setRequire(true);
      } else {
        onAddPlaylist({
          name: playlistName,
          description: playlistDescription,
          channel_id: activeChannel.id,
        });

        setChangePlaylist(false);
        onGetPlaylist({ id: activeChannel.id });
      }
    }
  }

  // Modal window (Save changes)
  const toggleSave = () => {
    setModalSave(!modalSave);
  };

  // On chnage global function
  const onChanged = (setName) => (e) => {
    if (valueButton === "edit") {
      setName(e.target.value);
      console.log(e.target.value);
    } else {
      setName(e.target.value);
    }
  };

  // On toggle languages
  const toggleCustomJustified = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
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
                  value={valueButton === "edit" ? editName : playlistName}
                  onChange={onChanged(
                    valueButton === "edit" ? setEditName : setplaylistName
                  )}
                />
                <AvField
                  className="form-control"
                  type="textarea"
                  rows="5"
                  label="Description"
                  name="description"
                  required={require}
                  placeholder="description"
                  value={
                    valueButton === "edit"
                      ? editDescription
                      : playlistDescription
                  }
                  onChange={onChanged(
                    valueButton === "edit"
                      ? setEditDescription
                      : setplaylistDescription
                  )}
                />
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
                    setChekedItems([]);
                    setChangePlaylist(false);
                    setCheckName("");
                    setEditName("");
                    setEditDescription("");
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

export default CreatePlaylist;
