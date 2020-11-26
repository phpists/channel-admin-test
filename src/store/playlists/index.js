import { Types } from "./actions";

const initialState = {
  playlists: null,
  activePlaylist: null
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
    case Types.SET_ACTIVE_PLAYLIST: {
      return {
        ...state, ...{
          activePlaylist: action.payload,
        }
      }
    }
    default:
      return state;
  }
};

export default reducer;
