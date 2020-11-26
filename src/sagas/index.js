import { all, takeEvery } from 'redux-saga/effects'
import { Types as AuthorizationTypes } from '../store/authorization/actions'
import { Types as ProfileTypes } from '../store/profile/actions'
import { Types as ChannelsTypes } from '../store/channels/actions'
import LayoutSaga from './../store/layout/saga'

import {
    watchlogin,
    watchRegisterUser,
    watchForgotPassword,
    watchNewPassword,
} from './authorization'

import {
    watchGetUserProfile,
    watchChangeUserProfile,
} from './profile'

import {
    watchAddChannel,
    watchGetChannels,
    watchDeleteChannel,
    watchUpdateChannel,
} from './channels'

export function* rootSaga() {
    yield all([
        takeEvery(AuthorizationTypes.LOGIN_REQUEST, watchlogin),
        takeEvery(AuthorizationTypes.REGISTER_USER_REQUEST, watchRegisterUser),
        takeEvery(AuthorizationTypes.FORGOT_PASSWORD_REQUEST, watchForgotPassword),
        takeEvery(AuthorizationTypes.SEND_NEW_PASSAWORD_REQUEST, watchNewPassword),
        
        takeEvery(ProfileTypes.GET_USER_PROFILE_REQUEST, watchGetUserProfile),
        takeEvery(ProfileTypes.CHANGE_USER_PROFILE_REQUEST, watchChangeUserProfile),
        
        takeEvery(ChannelsTypes.ADD_CHANNEL_REQUEST, watchAddChannel),
        takeEvery(ChannelsTypes.GET_CHANNELS_REQUEST, watchGetChannels),
        takeEvery(ChannelsTypes.DELETE_CHANNEL_REQUEST, watchDeleteChannel),
        takeEvery(ChannelsTypes.UPDATE_CHANNEL_REQUEST, watchUpdateChannel),
        
        LayoutSaga(),
    ])
}