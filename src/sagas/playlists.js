import { put, select } from "redux-saga/effects";
import Actions from "../store/actions";
import { API } from "../helpers/api";
import { history } from "./../routes";
import selectors from './../selectors'

export function* watchAddPlaylist(action) {
  const response = yield API.playlists.addPlaylist(action.payload);

  if (response.status === 200) {
    if (response.data.status === "error") {
      yield put(
        Actions.common.setErrorNotify(response?.data?.message || "Server error")
      );
    } else {
      history.push("/content");
      yield put(Actions.playlists.getPlaylistsRequest());
      yield put(Actions.playlists.setActivePlaylis(response.data?.channel))
    }
  } else {
    yield put(Actions.common.setErrorNotify(response.status + " Server error"));
  }
}

export function* watchDeletePlaylist(action) {
  const response = yield API.playlists.deletePlaylist(action.payload)

  if (response.status === 200) {
    if (response.data.status === 'error') {
      yield put(Actions.common.setErrorNotify(response?.data?.message || 'Server error' ))
    } else {
      yield put(Actions.playlists.setActivePlaylis(null))
      yield put(Actions.playlists.getPlaylistsRequest())
      yield put(Actions.common.setSuccessNotify('Deleted successfully'))
    }
  } else {
    yield put(Actions.common.setErrorNotify(response.status + ' Server error'))
  }
}

export function* watchUpdatePlaylist(action) {
  const response = yield API.playlists.updatePlaylist(action.payload)

  if (response.status === 200) {
    if (response.data.status === 'error') {
      yield put(Actions.common.setErrorNotify(response?.data?.message || 'Server error' ))
    } else {
      yield put(Actions.common.setSuccessNotify('Updated successfully'))
      yield put(Actions.playlists.getPlaylistsRequest())
    }
  } else {
    yield put(Actions.common.setErrorNotify(response.status + ' Server error'))
  }
}

export function* watchGetPlaylists() {
  const response = yield API.playlists.getPlaylists();
  if (response.status === 200) {
    if (response.data.status === "error") {
      yield put(
        Actions.common.setErrorNotify(response?.data?.message || "Server error")
      );
    } else {
      yield put(Actions.playlists.getPlaylistsSuccess(response?.data));
    }

    const state = yield select()
    const activePlaylist = selectors.playlists.activePlaylist(state)

    if(activePlaylist === null){
      yield put(Actions.playlists.setActivePlaylis(response?.data?.[0]))
    }
  } else {
    yield put(Actions.common.setErrorNotify(response.status + " Server error"));
  }
}