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
  } = props;
  const [newPlaylist, setnewPlaylist] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [check, checkSet] = useState("");
  const [activeTab, setActiveTab] = useState("1");

  const toggleDelete = () => setModalDelete(!modalDelete);
  const toggleEdit = () => setModalEdit(!modalEdit);

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
                    <Nav>
                      <NavItem>
                        <Button
                          color="primary mr-2"
                          onClick={() => setnewPlaylist(true)}
                          className="d-flex"
                        >
                          <i className="dripicons-plus plus mr-2"></i> New
                          Playlist
                        </Button>
                      </NavItem>
                      <NavItem>
                        <Button color="primary mr-2" onClick={toggleEdit}>
                          Edit{" "}
                          <i
                            className="fa fa-ellipsis-v font-size-11 ml-2"
                            aria-hidden="true"
                          ></i>
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
                      </NavItem>
                      <NavItem>
                        <Button color="primary" onClick={toggleDelete}>
                          Delete{" "}
                          <i
                            className="fa fa-trash ml-2"
                            aria-hidden="true"
                          ></i>
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
                      </NavItem>
                    </Nav>
                    <Form>
                      <Table hover className="mt-3">
                        <tbody>
                          {playlists?.length
                            ? playlists?.map((p) => {
                                return (
                                  <tr
                                    key={p.id}
                                    className="d-flex justify-content-between align-items-center playlist"
                                  >
                                    <th className="border-0 px-0">
                                      <FormGroup check className="p-0">
                                        <Label check className="checkContainer">
                                          <Input
                                            type="checkbox"
                                            value={check.name}
                                            checked={
                                              check.id == p.id ? true : false
                                            }
                                            onChange={() => {
                                              checkSet(p);
                                            }}
                                          />{" "}
                                          {p.name}
                                          <span className="checkboxProt"></span>
                                          <i className="dripicons-checkmark checkmark"></i>
                                        </Label>
                                      </FormGroup>
                                    </th>
                                    <th className="border-0 px-0">
                                      <span>4 items</span>
                                    </th>
                                  </tr>
                                );
                              })
                            : null}
                        </tbody>
                      </Table>
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
          You haven`t any videos yet.
        </CardTitle>
        <div className="text-center mb-3">
          <Link to="/content">
            <Button color="primary" className="waves-effect">
              <i className="bx bx-plus font-size-16 align-middle mr-2" />
              Creacte a new videos
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
          You haven`t any playlist yet.
        </CardTitle>
        <div className="text-center mb-3">
          <Link to="/content">
            <Button color="primary" className="waves-effect">
              <i className="bx bx-plus font-size-16 align-middle mr-2" />
              Creacte a new playlist
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
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(withNamespaces()(Content));
