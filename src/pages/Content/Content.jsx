import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { connect } from "react-redux";
import classnames from "classnames";
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
  Container,
  Input,
  Label,
  Form,
  CardSubtitle,
} from "reactstrap";
import "./content.scss";
import CreatePlaylist from "./CreatePlaylist";
import selectors from "../../selectors";
import Actions from "../../store/actions";
import { withNamespaces } from "react-i18next";
import DeletePlaylistModal from "./DeletePlaylistModal";
import EmptyPlaylists from "./EmptyPlaylists";
import EmptyVideos from "./EmptyVideos";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Upload from "./Upload";

const Content = (props) => {
  // Get props
  const {
    activeChannel,
    onAddPlaylist,
    playlists,
    onPlaylistDelete,
    onUpdatePlaylist,
    onGetPlaylist,
  } = props;

  // State local
  const [changePlaylist, setChangePlaylist] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [checkName, setCheckName] = useState("");
  const [checkId, setCheckId] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [valueButton, setValueButton] = useState("");
  const [characters, updateCharacters] = useState(playlists);
  const [checkedItems, setChekedItems] = useState([]);
  const [modalSave, setModalSave] = useState(false);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Vallues
  const defaultChannel = JSON.parse(localStorage.getItem("channel"));
  const item = characters?.filter((c) => c.id === checkedItems[0]);

  // Handle event

  // Change page on click Create Playlist || Edit 
  const changePage = (e) => {
    const nameButton = e.target.value;
    if (nameButton === "edit") {
      setEditName(item[0].name);
      setEditDescription(item[0].description);
      setCheckId(item[0].id);
      setCheckName(item[0].name);
      setChangePlaylist(true);
      setValueButton(nameButton);
    } else {
      setChangePlaylist(true);
      setValueButton(nameButton);
    }
  };

  // Toggle modal window (DELETE)
  const toggleDelete = () => {
    setModalDelete(!modalDelete);
    setCheckId(item[0].id);
    setCheckName(item[0].name);
  };

  // Toggle tab (LEFT PANEL)
  const toggleTab = (tab) => {
    if (checkName !== editName) {
      setModalSave(!modalSave);
    } else {
      if (activeTab !== tab) {
        setActiveTab(tab);
        setChangePlaylist(false);
        setChekedItems([]);
      }
      setChangePlaylist(false);
      setChekedItems([]);
    }
  };

  // Drag playlist
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateCharacters(items);
  }

  // Set & remove checkmark
  const handleChange = (p) => {
    const clickedCategory = checkedItems.indexOf(p.id);
    const all = [...checkedItems];

    if (clickedCategory === -1) {
      all.push(p.id);
    } else {
      all.splice(clickedCategory, 1);
    }
    setChekedItems(all);
  };

  // Side effects
  useEffect(() => {
    if (playlists === null) {
      onGetPlaylist({ id: defaultChannel?.id || "1" });
    }
    updateCharacters(playlists);
  }, [playlists, onGetPlaylist]);

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={"Dashboard"} breadcrumbItem={"content"} />
          <Row className="align-items-start">
            {/* LEFT PANEL */}
            <Col xs="12" sm="5" md="4" lg="3">
              <Card>
                <CardBody>
                  <Nav className="border-0 navi" vertical>
                    <NavItem>
                      <NavLink
                        className="px-0"
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          toggleTab("3");
                        }}
                      >
                        <Button className="w-100 mb-4" color="success">
                          Upload
                        </Button>
                      </NavLink>
                    </NavItem>
                    <NavItem className="d-flex justify-content-between align-items-baseline">
                      <NavLink
                        className="px-0"
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          toggleTab("1");
                        }}
                      >
                        <i className="dripicons-star mr-2"></i> Playlists
                      </NavLink>
                      <span>({playlists?.length})</span>
                    </NavItem>
                    <NavItem className="d-flex justify-content-between align-items-baseline">
                      <NavLink
                        className="px-0"
                        className={classnames({
                          active: activeTab === "2",
                        })}
                        onClick={() => {
                          toggleTab("2");
                        }}
                      >
                        <i className=" dripicons-jewel mr-2"></i> Videos
                      </NavLink>
                      <span>({0})</span>
                    </NavItem>
                  </Nav>
                </CardBody>
              </Card>
            </Col>
            {/* RIGHT PANEL */}
            <Col xs="12" sm="7" md="8" lg="9">
              {changePlaylist ? (
                <CreatePlaylist
                  {...{
                    activeChannel,
                    onAddPlaylist,
                    setChangePlaylist,
                    onGetPlaylist,
                    valueButton,
                    onUpdatePlaylist,
                    setCheckName,
                    checkName,
                    checkId,
                    modalSave,
                    setModalSave,
                    editName,
                    setEditName,
                    editDescription,
                    setEditDescription,
                    setChekedItems,
                  }}
                />
              ) : (
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Card className="flex-column align-items-start">
                      <CardBody className="w-100">
                        <CardTitle>Playlists</CardTitle>
                        <CardSubtitle className="mb-3">
                          {playlists?.length} Total
                        </CardSubtitle>
                        <div className="btn-toolbar py-3" role="toolbar">
                          <Button
                            color="primary mr-2"
                            onClick={changePage}
                            className="btn btn-primary waves-light waves-effect"
                            value="newPlaylist"
                          >
                            <i className="fa fa-plus-circle mr-1"></i> New
                            Playlist
                          </Button>
                          <Button
                            color="primary mr-2"
                            onClick={changePage}
                            className="btn btn-primary waves-light waves-effect"
                            value="edit"
                            disabled={
                              checkedItems.length == 0 ||
                              checkedItems.length > 1
                            }
                          >
                            Edit{" "}
                            <i className="mdi mdi-dots-vertical ml-2 dots"></i>
                          </Button>
                          <Button
                            type="button"
                            color="primary"
                            onClick={toggleDelete}
                            className="btn btn-primary waves-light waves-effect"
                            disabled={checkedItems.length === 0}
                          >
                            {" "}
                            Delete<i className="far fa-trash-alt ml-2"></i>
                          </Button>
                          <DeletePlaylistModal
                            {...{
                              checkId,
                              checkName,
                              setCheckName,
                              modalDelete,
                              toggleDelete,
                              onPlaylistDelete,
                              onGetPlaylist,
                              activeChannel,
                              setChekedItems
                            }}
                          />
                        </div>

                        {playlists?.length === 0 ? (
                          <EmptyPlaylists />
                        ) : (
                          <Form>
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                              <Droppable droppableId="characters">
                                {(provided) => (
                                  <ul
                                    className="message-list"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                  >
                                    {provided.placeholder}
                                    {playlists &&
                                      characters?.map((p, index) => {
                                        return (
                                          <Draggable
                                            key={p.id}
                                            draggableId={String(p.name)}
                                            index={index}
                                          >
                                            {(provided) => (
                                              <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                              >
                                                <Label className="check d-flex align-items-center ml-4">
                                                  <Input
                                                    type="checkbox"
                                                    name={p.name}
                                                    checked={checkedItems.includes(
                                                      p.id
                                                    )}
                                                    onChange={() =>
                                                      handleChange(p)
                                                    }
                                                  />
                                                  <span className="title mr-3">
                                                    {index + 1}
                                                  </span>
                                                  {p.name}
                                                  <div className="col-mail col-mail-2">
                                                    <div className="date">
                                                      4 items
                                                    </div>
                                                  </div>
                                                </Label>
                                              </li>
                                            )}
                                          </Draggable>
                                        );
                                      })}
                                  </ul>
                                )}
                              </Droppable>
                            </DragDropContext>
                          </Form>
                        )}
                      </CardBody>
                    </Card>
                  </TabPane>
                  <TabPane tabId="2">
                    <Card>
                      <EmptyVideos {...{ setActiveTab }} />
                    </Card>
                  </TabPane>
                  <TabPane tabId="3">
                    <Card>
                      <Upload />
                    </Card>
                  </TabPane>
                </TabContent>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

// Get redux state values
const mapStatetoProps = (state) => ({
  playlists: selectors.playlists.playlists(state),
  activeChannel: selectors.channels.activeChannel(state),
  onePlayist: selectors.playlists.onePlaylist(state),
});

// Get redux state function
const mapDispatchToProps = (dispatch) => ({
  onAddPlaylist: (data) => dispatch(Actions.playlists.addPlaylistRequest(data)),
  onPlaylistDelete: (data) =>
    dispatch(Actions.playlists.deletePlaylistRequest(data)),
  onUpdatePlaylist: (data) =>
    dispatch(Actions.playlists.updatePlaylistRequest(data)),
  onGetPlaylist: (data) =>
    dispatch(Actions.playlists.getPlaylistsRequest(data)),
  onGetOnePlaylist: (data) =>
    dispatch(Actions.playlists.getOnePlaylistRequest(data)),
  errorMessage: (data) => dispatch(Actions.common.setErrorNotify(data)),
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withNamespaces()(Content));
