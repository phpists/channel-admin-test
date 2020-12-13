import React from "react";
import "../content.scss";
import { Card, CardBody } from "reactstrap";
import LanguagesTabs from "./LanguagesTabs";
import FormaData from "./FormaData";

const CreateEdit = (props) => {
  // Get props
  const {
    onAddPlaylist,
    onUpdatePlaylist,
    activeChannel,
    setChangePage,
    onGetPlaylist,
    valueButton,
    setCheckName,
    modalSave,
    editName,
    setEditName,
    editDescription,
    setEditDescription,
    setChekedItems,
    setModalSave,
    checkedItems,
    setCheckDesc,
    onUpdateVideo,
    onAddVideoToPlaylist,
    onGetVideosByPlaylist,
    getPlaylist,
    characters
  } = props;
  // State local

  return (
    <Card>
      <CardBody>
        {/* Toggle languages */}
        <LanguagesTabs />
        {/* Form group with validation */}
        <FormaData
          {...{
            valueButton,
            editName,
            setEditName,
            editDescription,
            setChekedItems,
            setChangePage,
            setCheckName,
            setCheckDesc,
            setEditDescription,
            onUpdatePlaylist,
            checkedItems,
            onGetPlaylist,
            activeChannel,
            onAddPlaylist,
            modalSave,
            setModalSave,
            onUpdateVideo,
            onAddVideoToPlaylist,
            onGetVideosByPlaylist,
            getPlaylist,
            characters
          }}
        />
      </CardBody>
      {/* <CardBody>
              <CardTitle>Meta Data</CardTitle>
              <CardSubtitle className="mb-3">
                Fill all information below
              </CardSubtitle> */}
      {/* Form group without validation */}
      {/* <FormGroup>
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
              </FormGroup> */}

      {/* </CardBody> */}
    </Card>
  );
};

export default CreateEdit;
