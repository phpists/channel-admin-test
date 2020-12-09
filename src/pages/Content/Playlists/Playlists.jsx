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
import EmptyPlaylists from "./EmptyPlaylists";
import DeletePlaylistModal from "./DeletePlaylistModal";
import CreatePlaylist from "./CreatePlaylist";

const Playlists = (props) => {
  const {
    characters,
    changePagePlaylist,
    checkedItems,
    toggleDelete,
    checkId,
    checkName,
    setCheckName,
    modalDelete,
    onPlaylistDelete,
    onGetPlaylist,
    activeChannel,
    setChekedItems,
    handleOnDragEnd,
    handleChange,
    updateCharacters,
    playlists,
    defaultChannel,
    onAddPlaylist,
    onUpdatePlaylist,
    changePlaylist,
    setChangePlaylist,
    valueButton,
    editNamePlaylist,
    setEditNamePlaylist,
    editDescriptionPlaylist,
    setEditDescriptionPlaylist,
    modalSave,
    setModalSave,
  } = props;

  useEffect(() => {
    if (playlists === null) {
      onGetPlaylist({ id: defaultChannel?.id || "1" });
    }
    if (
      characters === null ||
      playlists.length !== characters.length ||
      checkName !== editNamePlaylist
    ) {
      updateCharacters(playlists);
    }
  }, [defaultChannel, playlists]);

  return (
    <Card className="flex-column align-items-start">
      {changePlaylist ? (
        <CardBody className="w-100">
          {" "}
          <CreatePlaylist
            {...{
              activeChannel,
              onAddPlaylist,
              setChangePlaylist,
              onGetPlaylist,
              valueButton,
              onUpdatePlaylist,
              setCheckName,
              checkName,
              checkId,
              modalSave,
              setModalSave,
              editNamePlaylist,
              setEditNamePlaylist,
              editDescriptionPlaylist,
              setEditDescriptionPlaylist,
              setChekedItems,
            }}
          />
        </CardBody>
      ) : (
        <CardBody className="w-100">
          <CardTitle>Playlists</CardTitle>
          <CardSubtitle className="mb-3">
            {characters?.length} Total
          </CardSubtitle>
          <div className="btn-toolbar py-3" role="toolbar">
            <Button
              color="primary mr-2"
              onClick={changePagePlaylist}
              className="btn btn-primary waves-light waves-effect"
              value="newPlaylist"
            >
              <i className="fa fa-plus-circle mr-1"></i> Create Playlist
            </Button>
            <Button
              color="primary mr-2"
              onClick={changePagePlaylist}
              className="btn btn-primary waves-light waves-effect"
              value="editPlaylist"
              disabled={checkedItems.length === 0 || checkedItems.length > 1}
            >
              Edit <i className="mdi mdi-dots-vertical ml-2 dots"></i>
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={toggleDelete}
              className="btn btn-primary waves-light waves-effect"
              disabled={checkedItems.length === 0}
            >
              {" "}
              Delete<i className="far fa-trash-alt ml-2"></i>
            </Button>
            <DeletePlaylistModal
              {...{
                checkId,
                checkName,
                checkedItems,
                setCheckName,
                modalDelete,
                toggleDelete,
                onPlaylistDelete,
                onGetPlaylist,
                activeChannel,
                setChekedItems,
              }}
            />
          </div>

          {characters?.length === 0 ? (
            <EmptyPlaylists />
          ) : (
            <Form>
              <DragDropContext
                onDragEnd={(e) =>
                  handleOnDragEnd(e, characters, updateCharacters)
                }
              >
                <Droppable droppableId="characters">
                  {(provided) => (
                    <ul
                      className="message-list characters"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {characters &&
                        characters?.map((p, index) => {
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
                                      name={p.name}
                                      checked={checkedItems.includes(p.id)}
                                      onChange={() =>
                                        handleChange(
                                          p,
                                          checkedItems,
                                          setChekedItems
                                        )
                                      }
                                    />
                                    <span className="title mr-3">
                                      {index + 1}
                                    </span>
                                    {p.name}
                                    <div className="col-mail col-mail-2">
                                      <div className="date">4 items</div>
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

export default Playlists;
