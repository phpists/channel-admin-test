import React, { useState } from "react";
import "./content.scss";
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
  Input,
  Label,
  Form,
  CardSubtitle,
} from "reactstrap";
import { withNamespaces } from "react-i18next";
import { connect } from "react-redux";
import selectors from './../../selectors/index'
import Actions from "../../store/actions";
import Select from "react-select";

const CreatePlaylist = (props) => {
  const { onAddPlaylist, activeChannel } = props;

  const state = {
    activeTab: "1",
    activeTab1: "5",
    activeTab2: "9",
    activeTab3: "13",
    customActiveTab: "1",
    activeTabJustify: "5",
    col1: true,
    col2: false,
    col3: false,
    col5: true,
  };

  const [playlistName, setplaylistName] = useState("");
  const [playlistDescription, setplaylistDescription] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    onAddPlaylist({
      name: playlistName,
      description: playlistDescription,
      channel_id: activeChannel.id
    });
  }

  const toggleCustomJustified = (tab) => {
    if (state.activeTabJustify !== tab) {
      state({
        activeTabJustify: tab,
      });
    }
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
                    active: state.activeTabJustify === "4",
                  })}
                  onClick={() => {
                    toggleCustomJustified("4");
                  }}
                >
                  <span className="d-none d-sm-block">Ukrainian</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: state.activeTabJustify === "5",
                  })}
                  onClick={() => {
                    toggleCustomJustified("5");
                  }}
                >
                  <span className="d-none d-sm-block">English</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: state.activeTabJustify === "6",
                  })}
                  onClick={() => {
                    toggleCustomJustified("6");
                  }}
                >
                  <span className="d-none d-sm-block">Russian</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: state.activeTabJustify === "7",
                  })}
                  onClick={() => {
                    toggleCustomJustified("7");
                  }}
                >
                  <span className="d-none d-sm-block">Deutsch</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: state.activeTabJustify === "8",
                  })}
                  onClick={() => {
                    toggleCustomJustified("8");
                  }}
                >
                  <span className="d-none d-sm-block">Espanol</span>
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={state.activeTabJustify}>
              <TabPane tabId="4" className="p-3"></TabPane>
              <TabPane tabId="5" className="p-3"></TabPane>
              <TabPane tabId="6" className="p-3"></TabPane>
              <TabPane tabId="7" className="p-3"></TabPane>
              <TabPane tabId="8" className="p-3"></TabPane>
            </TabContent>
            <Form>
              <FormGroup>
                <Label htmlFor="name">Title</Label>
                <Input
                  id="name"
                  placeholder="title"
                  name="name"
                  type="text"
                  className="form-control"
                  value={playlistName}
                  onChange={(e) => {
                    setplaylistName(e.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="productdesc">Description</Label>
                <textarea
                  className="form-control"
                  id="productdesc"
                  rows="5"
                  placeholder="description"
                  value={playlistDescription}
                  onChange={(e) => {
                    setplaylistDescription(e.target.value);
                  }}
                ></textarea>
              </FormGroup>
              <FormGroup className="select2-container">
                <Label className="control-label">Playlist</Label>
                <Select
                  classNamePrefix="select2-selection"
                  placeholder="Chose..."
                  title="orderby"
                  // options={options}
                  isMulti
                />
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <CardTitle>Meta Data</CardTitle>
            <CardSubtitle className="mb-3">
              Fill all information below
            </CardSubtitle>

            <Form>
              <Row>
                <Col sm={6}>
                  <FormGroup>
                    <Label htmlFor="metatitle">Meta title</Label>
                    <Input
                      id="metatitle"
                      name="productname"
                      type="text"
                      className="form-control"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="metakeywords">Meta Keywords</Label>
                    <Input
                      id="metakeywords"
                      name="manufacturername"
                      type="text"
                      className="form-control"
                    />
                  </FormGroup>
                </Col>

                <Col sm={6}>
                  <FormGroup>
                    <Label htmlFor="metadescription">Meta Description</Label>
                    <textarea
                      className="form-control"
                      id="metadescription"
                      rows="5"
                    ></textarea>
                  </FormGroup>
                </Col>
              </Row>

              <Button
                type="submit"
                color="primary"
                className="mr-1 waves-effect waves-light"
                onClick={onSubmit}
              >
                Save Changes
              </Button>
              <Button type="submit" color="secondary" className="waves-effect">
                Cancel
              </Button>
            </Form>
          </CardBody>
        </Card>
      </TabPane>
    </TabContent>
  );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces()(CreatePlaylist));
