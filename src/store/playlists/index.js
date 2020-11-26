import { Types } from "./actions";

const initialState = {
  playlists: null,
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
    default:
      return state;
  }
};

export default reducer;
