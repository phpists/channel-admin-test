import React, { useState, useEffect, useRef } from "react";
import { Form, Label, Input } from "reactstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Loader from "../../../../helpers/loader";

const CheckItems = (props) => {
  const {
    updateItems,
    items,
    checkedItems,
    setChekedItems,
    handleOnDragEnd,
    handleChange,
    toEdit,
    onGetVideosByPlaylist,
    getPlaylist,
    defaultChannel,
    loader,
    setLoader,
    onGetOnePlaylist,
    onGetOneVideo,
    activeTab,
    onChangeVideoOrder,
    onUpdatePlaylist,
    onGetPlaylist,
    characters
  } = props;

  const [orderByValue, setOrderByValue] = useState(0);
  const [videoId, setVideoId] = useState(0);
  const [playlistId, setPlaylistId] = useState(0);

  let allItems = [];
  for (let str of items) {
    if (!allItems.includes(str)) {
      allItems.push(str);
    }
  }

  // set input data when changed
  const onOrderbyClick = (orderByValue, e) => {
    setOrderByValue(Number(orderByValue));
    if (activeTab === "1") {
      setPlaylistId(e);
    } else {
      setVideoId(e.id);
      setPlaylistId(e.playlist_id || 1);
    }
  };

  // Sort items by property
  function dynamicSort(property) {
    const sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      const result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  const sortedItems =
    activeTab === "1"
      ? items.filter((i) => i.active === 1).sort(dynamicSort("orderby"))
      : items.sort(dynamicSort("orderby"));

  // save order number by Enter press
  const onEnterPress = (event) => {
    if (event.keyCode == 13) {
      if(activeTab === "1") {
        onUpdatePlaylist({
          id: playlistId.id,
          name: playlistId.name,
          description: playlistId.description,
          orderby: orderByValue
        });
        setTimeout(() => {
          onGetPlaylist({ id: defaultChannel.id, count: 0 });
        }, 1000);
        updateItems(null);
      } else {
        onChangeVideoOrder({
          playlist_id: playlistId,
          video_id: videoId,
          orderby: orderByValue,
        });
        setTimeout(() => {
          onGetVideosByPlaylist({
            id: getPlaylist?.id,
            channel: defaultChannel?.id,
            count: 0,
            // video_id: null
          });
        }, 1000);
      }
      // event.target.blur();
        setLoader(true);
    }
  };

  useEffect(() => {
    if (sortedItems.length !== 0) {
      setLoader(false);
    }
  }, [sortedItems]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <Form>
          <DragDropContext
            onDragEnd={(e) => handleOnDragEnd(e, sortedItems)}
          >
            <Droppable droppableId="characters">
              {(provided) => (
                <ul
                  className="message-list characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  { sortedItems &&
                    sortedItems?.map((p, index) => {
                      const element = Number(p.duration || 0);
                      let hours = Math.floor(element / 3600);
                      let minutes = Math.floor((element % 3600) / 60);

                      if (hours < 10) {
                        hours = `0${hours}`;
                      }

                      if (minutes < 10) {
                        minutes = `0${minutes}`;
                      }
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

                                {getPlaylist !== null || activeTab === "1" ? (
                                  <input
                                    style={{ fontSize: "10px", width: "38px" }}
                                    className="videosOrderNumber"
                                    type="text"
                                    checked={checkedItems.includes(p.id)}
                                    defaultValue={p.orderby}
                                    // value={orderByValue}
                                    onChange={(event) =>
                                      onOrderbyClick(event.target.value, p)
                                    }
                                    onKeyDown={(event) => onEnterPress(event)}
                                  />
                                ) : null}

                                {activeTab === "1" ? (
                                  <>
                                    {" "}
                                    <span
                                      id="editPlaylist"
                                      onClick={(e) => {
                                        onGetOnePlaylist({ id: p.id });
                                        toEdit(p, e.currentTarget.id, "en");
                                      }}
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
                                      alt="img"
                                    />
                                    <span
                                      id="editVideo"
                                      onClick={(e) => {
                                        onGetOneVideo({ id: p.id });
                                        toEdit(p, e.currentTarget.id, "en");
                                      }}
                                    >
                                      {p.name}{" "}
                                    </span>
                                  </>
                                )}
                                <div className="col-mail col-mail-2">
                                  <div className="date">
                                    {activeTab === "1" ? (
                                      `${p?.videos_count} items`
                                    ) : (
                                      <>{`${hours}:${minutes}`}</>
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
      )}
    </>
  );
};

export default CheckItems;
