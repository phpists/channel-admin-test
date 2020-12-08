import React from "react";
import { CardBody, CardTitle, Button } from "reactstrap";
import { Link } from "react-router-dom";

const EmptyVideos = (props) => {
  const {setActiveTab} = props;

  const toggleToUpload = () => {
    setActiveTab("3")
  }

  return (
    <div className="overlay">
      <CardBody>
        <CardTitle className="text-center mb-3 mt-3">
          Upload your first video to get started!
        </CardTitle>
        <div className="text-center mb-3">
          <Link to="/content">
            <Button color="info" className="waves-effect" onClick={toggleToUpload}>
              Upload videos
            </Button>
          </Link>
        </div>
      </CardBody>
    </div>
  );
};



export default EmptyVideos;
