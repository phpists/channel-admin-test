import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
} from "reactstrap";
import "./content.scss";
import CreatePlaylist from "./CreatePlaylist";
import selectors from "../../selectors";
import Actions from '../../store/actions'

const Content = React.memo((props) => {
  const {activeChannel, onAddPlaylist} = props;
  const [newPlaylist, setnewPlaylist] = useState(false);

  const renderContent = () => {
    return (
      <Row className="align-items-start">
        <Col xs="12" sm="4" md="3" lg="2" className="bg-white">
          <Nav className="border-0" vertical pills tabs>
            <NavItem>
              <Button className="w-100 mx-2" color="success">
                Upload
              </Button>
            </NavItem>
            <NavItem className="d-flex justify-content-between align-items-center">
              <NavLink><i className="dripicons-star"></i> Playlists</NavLink>
              <span>(12)</span>
            </NavItem>
            <NavItem className="d-flex justify-content-between align-items-center">
              <NavLink><i className=" dripicons-jewel mr-2"></i> Videos</NavLink>
              <span>(4)</span>
            </NavItem>
          </Nav>
        </Col>
        <Col xs="12" sm="8" md="9" lg="10">
          {newPlaylist ? (
            <CreatePlaylist activeChannel={activeChannel} onAddPlaylist={onAddPlaylist} />
          ) : (
            <TabContent activeTab="1">
              <TabPane tabId="1">
                <Card className="flex-column align-items-start">
                  <CardBody>
                    <CardTitle>Playlists</CardTitle>
                    <CardSubtitle className="mb-3">21 Total</CardSubtitle>
                    <Nav>
                      <NavItem>
                        <Button
                          color="primary mr-2"
                          onClick={() => setnewPlaylist({ newPlaylist: true })}
                        >
                          New Playlist
                        </Button>
                      </NavItem>
                      <NavItem>
                        <Button
                          color="primary mr-2"
                        >
                          Edit
                        </Button>
                      </NavItem>
                      <NavItem>
                        <Button
                          color="primary"
                        >
                          Delete
                        </Button>
                      </NavItem>
                    </Nav>
                    <Form className="d-flex flex-column">

                      <FormGroup
                        check
                        className="d-flex justify-content-between w-100"
                      >
                        <Label check>
                          <Input type="checkbox" /> Playlist Name Here 01
                        </Label>
                        <span>4 items</span>
                      </FormGroup>
                      <FormGroup
                        check
                        className="d-flex justify-content-between w-100"
                      >
                        <Label check>
                          <Input type="checkbox" /> Playlist Name Here 02
                        </Label>
                        <span>4 items</span>
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="2"></TabPane>
            </TabContent>
          )}
        </Col>
      </Row>
    );
  };

  const renderEmptyContentMessage = () => (
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
          {Boolean(true) ? renderContent() : renderEmptyContentMessage()}
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
});

export default connect(mapStatetoProps, mapDispatchToProps)(Content);
