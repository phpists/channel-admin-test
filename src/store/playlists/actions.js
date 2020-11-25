export const Types = {
  ADD_PLAYLIST_REQUEST: "ADD_PLAYLIST_REQUEST",
  ADD_PLAYLIST_SUCCESS: "ADD_PLAYLIST_SUCCESS",

  GET_PLAYLISTS_REQUEST: "GET_PLAYLISTS_REQUEST",
  GET_PLAYLISTS_SUCCESS: "GET_PLAYLISTS_SUCCESS",

  DELETE_PLAYLIST_REQUEST: "DELETE_PLAYLIST_REQUEST",

  UPDATE_PLAYLIST_REQUEST: "UPDATE_PLAYLIST_REQUEST",
};

const addPlaylistRequest = (payload) => ({
  type: Types.ADD_PLAYLIST_REQUEST,
  payload,
});

const addPlaylistSuccess = () => ({
  type: Types.ADD_PLAYLIST_SUCCESS,
});

const getPlaylistsRequest = () => ({
  type: Types.GET_PLAYLISTS_REQUEST,
});

const getPlaylistsSuccess = (payload) => ({
  type: Types.GET_PLAYLISTS_SUCCESS,
  payload,
});

const deletePlaylistRequest = (payload) => ({
  type: Types.DELETE_PLAYLIST_REQUEST,
  payload,
});

const updatePlaylistRequest = (payload) => ({
  type: Types.UPDATE_PLAYLIST_REQUEST,
  payload,
});

export default {
  addPlaylistRequest,
  addPlaylistSuccess,
  getPlaylistsRequest,
  getPlaylistsSuccess,
  deletePlaylistRequest,
  updatePlaylistRequest,
};
