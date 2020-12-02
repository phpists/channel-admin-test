import { Types } from "./actions";

const initialState = {
  playlists: null,
  onePlaylist: null,
  dragedPlaylist: []
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
    case Types.DRAG_PLAYLIST: {
      return {
        ...state,
        ...{
          dragedPlaylist: action.payload
        }
      }
    }
    default:
      return state;
  }
};

export default reducer;
