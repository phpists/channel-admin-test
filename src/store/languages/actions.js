export const Types = {
    GET_CHANNEL_LANGUAGES_REQUEST: "GET_CHANNEL_LANGUAGES_REQUEST",
    GET_CHANNEL_LANGUAGES_SUCCESS: "GET_CHANNEL_LANGUAGES_SUCCESS",

    UPDATE_CHANNEL_LANGUAGES_REQUEST: "UPDATE_CHANNEL_LANGUAGES_REQUEST",
    UPDATE_CHANNEL_LANGUAGES_SUCCESS: "UPDATE_CHANNEL_LANGUAGES_SUCCESS"
}

const getChannelLanguagesRequest = (payload) => ({
    type: Types.GET_CHANNEL_LANGUAGES_REQUEST,
    payload
});

const getChannelLanguagesSuccess = (payload) => ({
    type: Types.GET_CHANNEL_LANGUAGES_SUCCESS,
    payload
});

const updateChannelLanguagesRequest = (payload) => ({
    type: Types.UPDATE_CHANNEL_LANGUAGES_REQUEST,
    payload
});

const updateChannelLanguagesSuccess = (payload) => ({
    type: Types.UPDATE_CHANNEL_LANGUAGES_SUCCESS,
    payload
})

export default {
    getChannelLanguagesRequest,
    getChannelLanguagesSuccess,
    updateChannelLanguagesRequest,
    updateChannelLanguagesSuccess
}