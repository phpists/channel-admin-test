import React, { useEffect, useState, useRef } from "react";
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
  FormGroup,
  Container,
  Input,
  Label,
  Form,
  CardSubtitle,
  Table,
} from "reactstrap";
import "./content.scss";
import CreatePlaylist from "./CreatePlaylist";
import selectors from "../../selectors";
import Actions from "../../store/actions";
import { withNamespaces } from "react-i18next";
import { DeletePlaylistModal } from "./DeletePlaylistModal";
import EditPlaylistModal from "./EditPlaylistModal";

const Content = React.memo((props) => {
  const {
    activeChannel,
    onAddPlaylist,
    playlists,
    onPlaylistDelete,
    onUpdatePlaylist,
    onGetPlaylist,
    errorMessage,
  } = props;
  const [newPlaylist, setnewPlaylist] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [check, checkSet] = useState("");
  const [activeTab, setActiveTab] = useState("1");

  const toggleDelete = () => {
    if (!check.name) {
      return errorMessage("Please select a playlist");
    } else {
      setModalDelete(!modalDelete);
    }
  };
  const toggleEdit = () => {
    if (!check.name) {
      return errorMessage("Please select a playlist");
    } else {
      setModalEdit(!modalEdit);
    }
  };

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      setnewPlaylist(false);
    }
  };

  const renderContent = () => {
    return (
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
          {newPlaylist ? (
            <CreatePlaylist
              {...{
                activeChannel,
                onAddPlaylist,
                setnewPlaylist,
                onGetPlaylist,
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
                        onClick={() => setnewPlaylist(true)}
                        className="d-flex"
                      >
                        <i className="dripicons-plus plus mr-2"></i> New
                        Playlist
                      </Button>
                      <Button
                        color="primary mr-2"
                        onClick={toggleEdit}
                        className="btn btn-primary waves-light waves-effect"
                      >
                        Edit <i className="mdi mdi-dots-vertical ml-2"></i>
                      </Button>
                      <EditPlaylistModal
                        {...{
                          check,
                          checkSet,
                          modalEdit,
                          toggleEdit,
                          onUpdatePlaylist,
                          onGetPlaylist,
                        }}
                      />
                      <Button
                        type="button"
                        color="primary"
                        onClick={toggleDelete}
                        className="waves-light waves-effect"
                      >
                        {" "}
                        Delete<i className="far fa-trash-alt ml-2"></i>
                      </Button>
                      <DeletePlaylistModal
                        {...{
                          check,
                          checkSet,
                          modalDelete,
                          toggleDelete,
                          onPlaylistDelete,
                          onGetPlaylist,
                        }}
                      />
                    </div>
                    <Form>
                      <ul className="message-list">
                        {playlists?.length
                          ? playlists?.map((p) => {
                              return (
                                <li key={p.id}>
                                  <div className="col-mail col-mail-1">
                                    <div className="checkbox-wrapper-mail mx-0">
                                      <Input
                                        type="checkbox"
                                        value={check.name}
                                        checked={
                                          check.id == p.id ? true : false
                                        }
                                        onChange={() => {
                                          checkSet(p);
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
                            })
                          : null}
                      </ul>
                    </Form>
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="2">{renderEmptyContentMessageVideos()}</TabPane>
            </TabContent>
          )}
        </Col>
      </Row>
    );
  };

  const renderEmptyContentMessageVideos = () => (
    <div className="overlay">
      <CardBody>
        <CardTitle className="text-center mb-3 mt-3">
          Upload your first video to get started!
        </CardTitle>
        <div className="text-center mb-3">
          <Link to="/content">
            <Button color="info" className="waves-effect">
              Upload videos
            </Button>
          </Link>
        </div>
      </CardBody>
    </div>
  );

  const renderEmptyContentMessagePlaylist = () => (
    <div className="overlay">
      <CardBody>
        <CardTitle className="text-center mb-3 mt-3">
          Upload your files, then organize them and started with distibution
        </CardTitle>
        <div className="text-center mb-3">
          <Link to="/content">
            <Button
              color="info"
              className="waves-effect"
              onClick={setnewPlaylist(true)}
            >
              Playlists
            </Button>
          </Link>
        </div>
      </CardBody>
    </div>
  );

  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title={"Dashboard"} breadcrumbItem={"content"} />
          {Boolean(true)
            ? renderContent()
            : renderEmptyContentMessagePlaylist()}
        </Container>
      </div>
    </>
  );
});

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
  errorMessage: (data) => dispatch(Actions.common.setErrorNotify(data)),
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withNamespaces()(Content));
