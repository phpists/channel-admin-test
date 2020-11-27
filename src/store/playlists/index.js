import { Types } from "./actions";

const initialState = {
  playlists: null,
  onePlaylist: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_PLAYLISTS_SUCCESS: {
      return {
        ...state,
        ...{
          playlists: action.payload,
        },
      };
    }
    case Types.GET_ONE_PLAYLIST_SUCCESS: {
      return {
        ...state,
        ...{
          onePlaylist: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
