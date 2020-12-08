import React, { useEffect } from "react";
import {
  TabPane,
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

const Videos = (props) => {
  const {
    changePageVideo,
    checkedItemsVideos,
    checkIdVideos,
    checkNameVideos,
    setCheckNameVideos,
    setChekedItemsVideos,
    handleOnDragEnd,
    handleChangeVideos,
    videos,
    onGetVideos,
    modalDeleteVideos,
    toggleDeleteVideos,
  } = props;

  useEffect(() => {
    if (videos === null) {
        onGetVideos();
    }
  }, );


  return (
    <Card className="flex-column align-items-start">
      <CardBody className="w-100">
        <CardTitle>Videos</CardTitle>
        <CardSubtitle className="mb-3">{videos?.length} Total</CardSubtitle>
        <div className="btn-toolbar py-3" role="toolbar">
          <Button
            color="primary mr-2"
            className="btn btn-primary waves-light waves-effect"
            value="editVideo"
            onClick={changePageVideo}
            disabled={checkedItemsVideos.length == 0 || checkedItemsVideos.length > 1}
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
              setChekedItemsVideos
            }}
          />
        </div>

        {videos?.length === 0 ? (
          <EmptyVideos />
        ) : (
          <Form>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="characters">
                {(provided) => (
                  <ul
                    className="message-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {provided.placeholder}
                    {videos &&
                      videos?.map((p, index) => {
                        return (
                          <Draggable
                            key={p.id}
                            draggableId={String(p.name)}
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
                                    checked={checkedItemsVideos.includes(p.id)}
                                    onChange={() => handleChangeVideos(p)}
                                  />
                                  <span className="title mr-3">
                                    {index + 1}
                                  </span>
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
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </Form>
        )}
      </CardBody>
    </Card>
  );
};

export default Videos;