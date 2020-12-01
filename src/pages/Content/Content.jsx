import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
import EmptyMessage from "./EmptyMessage";

const Content = (props) => {
  const {
    activeChannel,
    onAddPlaylist,
    playlists,
    onPlaylistDelete,
    onUpdatePlaylist,
    onGetPlaylist,
    errorMessage,
    onGetOnePlaylist,
  } = props;
  const [changePlaylist, setChangePlaylist] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [check, setCheck] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [valueButton, setValueButton] = useState("");

  const change = (e) => {
    if (e.target.value === "edit") {
      if (!check.name) {
        return errorMessage("Please select a playlist");
      } else {
        setChangePlaylist(true);
        setValueButton(e.target.value);
      }
    } else {
      setChangePlaylist(true);
      setValueButton(e.target.value);
    }
  };

  const toggleDelete = () => {
    if (!check.name) {
      return errorMessage("Please select a playlist");
    } else {
      setModalDelete(!modalDelete);
    }
  };

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      setChangePlaylist(false);
      setCheck("");
    }
    setChangePlaylist(false);
    setCheck("");
  };

  // const getOnePlaylist = () => {
  //   if (!check.name) {
  //     return errorMessage("Please select a playlist");
  //   } else {
  //     onGetOnePlaylist({id: check.id});
  //   }
  // }

  useEffect(() => {
    if (playlists === null) {
      onGetPlaylist();
    }
  }, [playlists, onGetPlaylist]);

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={"Dashboard"} breadcrumbItem={"content"} />
          <Row className="align-items-start">
            <Col xs="12" sm="5" md="4" lg="3">
              <Card>
                <CardBody>
                  <Nav className="border-0 navi" vertical>
                    <NavItem>
                      <Button className="w-100 mb-4" color="success">
                        Upload
                      </Button>
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
                    setCheck,
                    check,
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
                            onClick={(e) => change(e)}
                            className="btn btn-primary waves-light waves-effect"
                            value="newPlaylist"
                          >
                            <i className="fa fa-plus-circle mr-1"></i> New
                            Playlist
                          </Button>
                          <Button
                            color="primary mr-2"
                            onClick={(e) => change(e)}
                            className="btn btn-primary waves-light waves-effect"
                            value="edit"
                            disabled={check.length < 1}
                          >
                            Edit <i className="mdi mdi-dots-vertical ml-2"></i>
                          </Button>
                          <Button
                            type="button"
                            color="primary"
                            onClick={toggleDelete}
                            className="btn btn-primary waves-light waves-effect"
                            disabled={check.length < 1}
                          >
                            {" "}
                            Delete<i className="far fa-trash-alt ml-2"></i>
                          </Button>
                          <DeletePlaylistModal
                            {...{
                              check,
                              setCheck,
                              modalDelete,
                              toggleDelete,
                              onPlaylistDelete,
                              onGetPlaylist,
                            }}
                          />
                          {/* <Button
                        type="button"
                        color="primary"
                        onClick={getOnePlaylist}
                        className="waves-light waves-effect ml-2"
                      >
                        {" "}
                        Get One
                      </Button> */}
                        </div>
                        {playlists === null ? (
                          EmptyMessage.renderEmptyContentMessagePlaylist()
                        ) : (
                          <Form>
                            <ul className="message-list">
                              {playlists &&
                                playlists?.map((p) => {
                                  return (
                                    <li key={p.id} onClick={() => setCheck(p)} className="check">
                                      <div className="col-mail col-mail-1">
                                        <div className="checkbox-wrapper-mail mx-0">
                                          <Input
                                            type="checkbox"
                                            value={check.name}
                                            checked={
                                              check.id === p.id ? true : false
                                            }
                                            onChange={() => {
                                              setCheck(p);
                                            }}
                                            id={p.id}
                                          />
                                          <Label
                                            className="toggle"
                                            htmlFor={p.id}
                                          ></Label>
                                        </div>
                                        <Link to="#" className="title">
                                          {p.name}
                                        </Link>
                                      </div>
                                      <div className="col-mail col-mail-2">
                                        <div className="date">4 items</div>
                                      </div>
                                    </li>
                                  );
                                })}
                            </ul>
                          </Form>
                        )}
                      </CardBody>
                    </Card>
                  </TabPane>
                  <TabPane tabId="2">
                    {EmptyMessage.renderEmptyContentMessageVideos()}
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

const mapStatetoProps = (state) => ({
  playlists: selectors.playlists.playlists(state),
  activeChannel: selectors.channels.activeChannel(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAddPlaylist: (data) => dispatch(Actions.playlists.addPlaylistRequest(data)),
  onPlaylistDelete: (data) =>
    dispatch(Actions.playlists.deletePlaylistRequest(data)),
  onUpdatePlaylist: (data) =>
    dispatch(Actions.playlists.updatePlaylistRequest(data)),
  onGetPlaylist: () => dispatch(Actions.playlists.getPlaylistsRequest()),
  onGetOnePlaylist: (data) =>
    dispatch(Actions.playlists.getOnePlaylistRequest(data)),
  errorMessage: (data) => dispatch(Actions.common.setErrorNotify(data)),
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withNamespaces()(Content));
