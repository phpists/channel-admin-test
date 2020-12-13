import React from "react";
import { CardBody, CardTitle, Button } from "reactstrap";
import { Link } from "react-router-dom";

const EmptyMessage = (props) => {
  const { setActiveTab, characters } = props;

  const toggleToUpload = () => {
    setActiveTab("3");
  };

  return (
    <div className="overlay">
      <CardBody>
        <CardTitle className="text-center mb-3 mt-3">
          {characters === null || characters.length === 0
            ? "Upload your files, then organize them and started with distibution"
            : "Upload your first video to get started!"}
        </CardTitle>
        <div className="text-center mb-3">
          <Link to="/content">
            <Button
              color="info"
              className="waves-effect"
              onClick={characters === null || characters.length === 0 ? null : toggleToUpload}
            >
              {characters === null || characters.length === 0
                ? "Playlists"
                : "Upload videos"}
            </Button>
          </Link>
        </div>
      </CardBody>
    </div>
  );
};

export default EmptyMessage;
