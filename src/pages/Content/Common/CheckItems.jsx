import React from "react";
import { Form, Label, Input } from "reactstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CheckItems = (props) => {
  const {
    updateItems,
    items,
    checkedItems,
    setChekedItems,
    handleOnDragEnd,
    handleChange,
    characters,
    toEdit,
  } = props;

  let allItems = [];
  for (let str of items) {
    if (!allItems.includes(str)) {
      allItems.push(str);
    }
  }

  return (
    <Form>
      <DragDropContext
        onDragEnd={(e) => handleOnDragEnd(e, items, updateItems)}
      >
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className="message-list characters"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items &&
                items?.map((p, index) => {
                  const element = (p.duration / 3600).toString().split("");
                  const minutes = element.splice(0, 1).join("");
                  const seconds = element.splice(1, 2);

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
                                handleChange(p, checkedItems, setChekedItems)
                              }
                            />
                            <span className="title mr-3">{index + 1}</span>
                            {items === characters ? (
                              <>
                              {" "}
                              <span
                                id="editPlaylist"
                                onClick={(e) => toEdit(p, e.currentTarget.id)}
                              >
                                {p.name}{" "}
                              </span>
                              </>
                            ) : (
                              <>
                                {" "}
                                <img
                                  src={JSON.parse(p.pictures)["100"]}
                                  className="picture"
                                />
                                <span
                                  id="editVideo"
                                  onClick={(e) => toEdit(p, e.currentTarget.id)}
                                >
                                  {p.vimeo_name}{" "}
                                </span>
                              </>
                            )}
                            <div className="col-mail col-mail-2">
                              <div className="date">
                                {items === characters ? (
                                  `${p?.videos_count} items`
                                ) : (
                                  <>
                                    {minutes}:
                                    {seconds.length === 0 ? "00" : seconds}{" "}
                                  </>
                                )}
                              </div>
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
  );
};

export default CheckItems;
