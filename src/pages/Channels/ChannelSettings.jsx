import React, { useState, useEffect } from "react";
import classnames from "classnames";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import DeleteChannelDialog from "./DeleteChannelDialog";
import { connect } from "react-redux";
import Actions from "./../../store/actions";
import { Link } from "react-router-dom";
import selectors from "./../../selectors";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { validate } from "./../../helpers/validation";
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
  Label,
  Input,
  FormText,
} from "reactstrap";
import "./channels.scss";

const ChannelSettings = React.memo((props) => {
  const {
    activeChannel,
    onChannelUpdate,
    onUpdateChannelLanguages,
    channelLanguages,
    onGetChannelLanguages,
    languagesAll
  } = props;
  const [activeTab, setActiveTab] = useState("1");
  const [channelName, setChannelName] = useState(activeChannel?.name || "");
  const [channelDomain, setChannelDomain] = useState(
    activeChannel?.domain || ""
  );
  const [channelSubDomain, setChannelSubDomain] = useState(
    activeChannel?.subdomain || ""
  );
  const [modal, setModal] = useState(false);
  const defaultChannel = JSON.parse(localStorage.getItem("channel"));

  const onSubmit = () => {
    onChannelUpdate({
      id: activeChannel.id,
      name: channelName,
      domain: channelDomain.replace(/\s/g, ""),
      subdomain: channelSubDomain.replace(/\s/g, ""),
    });
  };
  // Select languages
  const selectLang = (e) => {
    const name = e.target.name;
    const selected = channelLanguages[name] === 1;
    const all = { ...channelLanguages };

    if (selected) {
      all[name] = 0;
    } else {
      all[name] = 1;
    }
    onUpdateChannelLanguages({ channelId: defaultChannel.id, languages: all });
    setTimeout(() => {
      onGetChannelLanguages(defaultChannel.id);
    }, 1000);
  };

  const customValidation = (value) => {
    return validate.isChannelNameValid(value)
      ? true
      : `The field must not contain spaces.`;
  };

  const customDomainValidation = (value) => {
    if (value) {
      return validate.isChannelNameValid(value)
        ? true
        : `The field must not contain spaces.`;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (activeChannel) {
      setChannelName(activeChannel?.name);
      setChannelDomain(activeChannel?.domain || "");
      setChannelSubDomain(activeChannel?.subdomain || "");
    }
  }, [channelLanguages, activeChannel]);

  const toggle = () => setModal(!modal);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const renderChannelSettings = () => {
    return (
      <Row className="align-items-start">
        <Col xs="12" sm="4" md="3" lg="2" className="mb-2">
          <Nav className="border-0" vertical pills tabs>
            <NavItem className="bg-white text-center w-100 mx-auto">
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggleTab("1");
                }}
              >
                General
              </NavLink>
            </NavItem>
            <NavItem className="bg-white mt-2 text-center w-100 mx-auto">
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggleTab("2");
                }}
              >
                Other
              </NavLink>
            </NavItem>
            <NavItem className="mt-2 border-0 w-100">
              <Button
                outline
                color="danger"
                className="d-block w-100 mx-auto"
                onClick={toggle}
              >
                Delete Project
              </Button>
              <DeleteChannelDialog
                {...{ channelName, modal, setModal, toggle }}
                channelId={activeChannel.id}
              />
            </NavItem>
          </Nav>
        </Col>
        <Col xs="12" sm="8" md="9" lg="10">
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <AvForm
                onValidSubmit={(e, v) => {
                  onSubmit(e, v);
                }}
              >
                <Card>
                  <CardBody>
                    <div className="form-group">
                      <AvField
                        name="name"
                        className="form-control"
                        placeholder="Your film, show, company name. You can change this later"
                        type="text"
                        required
                        label="Title"
                        value={channelName}
                        onChange={(event) => {
                          setChannelName(event.target.value);
                        }}
                        validate={{ customValidation }}
                      />
                    </div>
                    <div className="form-group">
                      <AvField
                        name="domain"
                        className="form-control"
                        placeholder="Channels domain"
                        type="text"
                        label="Domain"
                        value={channelDomain}
                        onChange={(event) => {
                          setChannelDomain(event.target.value);
                        }}
                        validate={{ customDomainValidation }}
                      />
                    </div>
                    <div className="form-group">
                      <AvField
                        name="subdomain"
                        className="form-control"
                        placeholder="Channels subdomain"
                        type="text"
                        label="Subdomain"
                        value={channelSubDomain}
                        onChange={(event) => {
                          setChannelSubDomain(event.target.value);
                        }}
                        validate={{ customValidation }}
                      />
                    </div>
                    <div className="form-group">
                      <Label className="m-0 font-weight-bold">
                        Supported languages
                      </Label>
                      <FormText color="muted">
                        Enable languages so that viewers can see translated
                        content on your website
                      </FormText>
                      {languagesAll?.map((l, index) => {
                        // channelLanguages && console.log(Object.values(channelLanguages).includes("1"))
                        return (
                          <div key={index}>
                          {channelLanguages?.hasOwnProperty(l.id) ?
                            <Label
                            check
                            
                            className="d-block ml-4 mt-2 font-weight-bold"
                          >
                            <Input
                              type="checkbox"
                              name={l.id}
                              checked={channelLanguages[l.id] === 1}
                              onChange={selectLang}
                            />
                            {channelLanguages?.hasOwnProperty(l.id) ? l.name : null}
                          </Label>
                        :
                        null
                        }
                        </div>
                        );
                      })}
                    </div>
                  </CardBody>
                </Card>
                <Row className="justify-content-end mt-3">
                  <FormGroup>
                    <Button className="btn-size-130 mr-3" color="secondary">
                      Cancel
                    </Button>
                    <Button
                      className="btn-size-130 mr-3"
                      color="primary"
                      type="submit"
                    >
                      Save
                    </Button>
                  </FormGroup>
                </Row>
              </AvForm>
            </TabPane>
            <TabPane tabId="2">
              <Card>
                <CardBody>Other</CardBody>
              </Card>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    );
  };

  const renderEmptyChannlsMessage = () => (
    <div className="overlay">
      <CardBody>
        <CardTitle className="text-center mb-3 mt-3">
          You haven`t any channels yet.
        </CardTitle>
        <div className="text-center mb-3">
          <Link to="/channels/create">
            <Button color="primary" className="waves-effect">
              <i className="bx bx-plus font-size-16 align-middle mr-2" />
              Creacte a new project
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
          <Breadcrumbs
            title={"dashboard"}
            breadcrumbItem={"channel settings"}
          />
          {Boolean(activeChannel)
            ? renderChannelSettings()
            : renderEmptyChannlsMessage()}
        </Container>
      </div>
    </>
  );
});

const mapStatetoProps = (state) => ({
  activeChannel: selectors.channels.activeChannel(state),
  channelLanguages: selectors.languages.channelLanguages(state),
  languagesAll: selectors.languages.languagesAll(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChannelUpdate: (data) =>
    dispatch(Actions.channels.updateChannelRequest(data)),
  onGetChannelLanguages: (data) =>
    dispatch(Actions.languages.getChannelLanguagesRequest(data)),
  onUpdateChannelLanguages: (data) =>
    dispatch(Actions.languages.updateChannelLanguagesRequest(data)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(ChannelSettings);
