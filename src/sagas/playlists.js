import { put, select } from "redux-saga/effects";
import Actions from "../store/actions";
import { API } from "../helpers/api";
import { history } from "./../routes";

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
      yield put(Actions.common.setSuccessNotify('Created successfully'))
    }
  } else {
    yield put(Actions.common.setErrorNotify(response.status + " Server error"));
  }
}

export function* watchDeletePlaylist(action) {
  const response = yield API.playlists.deletePlaylist(action.payload)
  console.log(response?.data)
  if (response.status === 200) {
    if (response.data.status === 'error') {
      yield put(Actions.common.setErrorNotify(response?.data?.message || 'Server error' ))
    } else {
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
  } else {
    yield put(Actions.common.setErrorNotify(response.status + " Server error"));
  }
}