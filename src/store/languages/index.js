import { Types } from './actions';

const initialState = {
    languages: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_CHANNEL_LANGUAGES_SUCCESS:
            return {
                ...state,
                ...{
                    languages: action.payload.languages
                }
            }
        default:
            return state;
    }
};

export default reducer;