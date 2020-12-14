import { Types } from "./actions";

const initialState = {
  videos: null,
  count: null,
  videosByPlaylist: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_VIDEOS_SUCCESS: {
      return {
        ...state,
        ...{
          videos: action.payload.playlists,
          count: action.payload.count
        },
      };
    }
    case Types.GET_VIDEO_BY_PLAYLIST_SUCCESS: {
      return {
        ...state,
        ...{
          videosByPlaylist: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
