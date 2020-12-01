import React from "react";
import { CardBody, CardTitle, Button } from "reactstrap";
import { Link } from "react-router-dom";

export default {
  renderEmptyContentMessageVideos: () => (
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
  ),

  renderEmptyContentMessagePlaylist: () => (
    <div className="overlay">
      <CardBody>
        <CardTitle className="text-center mb-3 mt-3">
          Upload your files, then organize them and started with distibution
        </CardTitle>
        <div className="text-center mb-3">
          <Link to="/content">
            <Button color="info" className="waves-effect">
              Playlists
            </Button>
          </Link>
        </div>
      </CardBody>
    </div>
  ),
};
