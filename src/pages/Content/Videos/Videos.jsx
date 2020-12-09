import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Input,
  Label,
  Form,
  CardSubtitle,
} from "reactstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EmptyVideos from "./EmptyVideos";
import DeleteVideoModal from "./DeleteVideoModal";
import CreateVideo from "./CreateVideos";

const Videos = (props) => {
  const {
    changePageVideo,
    checkedItemsVideos,
    checkIdVideos,
    checkNameVideos,
    setCheckNameVideos,
    setChekedItemsVideos,
    handleOnDragEnd,
    handleChange,
    videos,
    onGetVideos,
    modalDeleteVideos,
    toggleDeleteVideos,
    changeVideos,
    editNameVideos,
    setEditNameVideos,
    editDescriptionVideos,
    setEditDescriptionVideos,
    valueButtonVideos,
    onUpdateVideo,
    onAddVideoToPlaylist,
    setChangeVideo,
    modalSave,
    setModalSave,
    characters,
    dragVIdeo,
    updateDragVideo,
  } = props;

  useEffect(() => {
    if (videos === null) {
      onGetVideos();
    }
    if (
      dragVIdeo === null ||
      videos.length !== dragVIdeo.length ||
      checkNameVideos !== editNameVideos
    ) {
      updateDragVideo(videos);
    }
  }, [videos]);

  return (
    <Card className="flex-column align-items-start">
      {changeVideos ? (
        <CardBody className="w-100">
          {" "}
          <CreateVideo
            {...{
              onGetVideos,
              onUpdateVideo,
              onAddVideoToPlaylist,
              setChangeVideo,
              valueButtonVideos,
              setCheckNameVideos,
              checkNameVideos,
              checkIdVideos,
              modalSave,
              setModalSave,
              editNameVideos,
              setEditNameVideos,
              editDescriptionVideos,
              setEditDescriptionVideos,
              setChekedItemsVideos,
              characters,
              videos,
            }}
          />
        </CardBody>
      ) : (
        <CardBody className="w-100">
          <CardTitle>Videos</CardTitle>
          <CardSubtitle className="mb-3">
            {dragVIdeo?.length} Total
          </CardSubtitle>
          <div className="btn-toolbar py-3" role="toolbar">
            <Button
              color="primary mr-2"
              className="btn btn-primary waves-light waves-effect"
              value="editVideo"
              onClick={changePageVideo}
              disabled={
                checkedItemsVideos.length === 0 || checkedItemsVideos.length > 1
              }
            >
              Edit <i className="mdi mdi-dots-vertical ml-2 dots"></i>
            </Button>
            <Button
              color="primary mr-2"
              className="btn btn-primary waves-light waves-effect"
              value="newVideo"
              onClick={changePageVideo}
            >
              <i className="dripicons-folder mr-1"></i> Add to playlist
            </Button>
            <Button
              type="button"
              color="primary"
              className="btn btn-primary waves-light waves-effect"
              onClick={toggleDeleteVideos}
              disabled={checkedItemsVideos.length === 0}
            >
              {" "}
              Delete<i className="far fa-trash-alt ml-2"></i>
            </Button>
            <DeleteVideoModal
              {...{
                checkIdVideos,
                checkNameVideos,
                checkedItemsVideos,
                setCheckNameVideos,
                modalDeleteVideos,
                toggleDeleteVideos,
                onGetVideos,
                setChekedItemsVideos,
              }}
            />
          </div>

          {dragVIdeo?.length === 0 ? (
            <EmptyVideos />
          ) : (
            <Form>
              <DragDropContext
                onDragEnd={(e) => handleOnDragEnd(e, videos, updateDragVideo)}
              >
                <Droppable droppableId="dragId">
                  {(provided) => (
                    <ul
                      className="message-list dragId"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {dragVIdeo &&
                        dragVIdeo?.map((p, index) => {
                          return (
                            <Draggable
                              key={p.id}
                              draggableId={String(p.vimeo_name)}
                              index={index}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Label className="check d-flex align-items-center ml-4">
                                    <Input
                                      type="checkbox"
                                      name={p.vimeo_name}
                                      checked={checkedItemsVideos.includes(
                                        p.id
                                      )}
                                      onChange={() =>
                                        handleChange(
                                          p,
                                          checkedItemsVideos,
                                          setChekedItemsVideos
                                        )
                                      }
                                    />

                                    <span className="title mr-3">
                                      {index + 1}
                                    </span>
                                    <img
                                      src={JSON.parse(p.pictures)["100"]}
                                      className="picture"
                                    />
                                    {p.vimeo_name}
                                    <div className="col-mail col-mail-2">
                                      <div className="date">59:40</div>
                                    </div>
                                  </Label>
                                </li>
                              )}
                            </Draggable>
                          );
                        })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </Form>
          )}
        </CardBody>
      )}
    </Card>
  );
};

export default Videos;
