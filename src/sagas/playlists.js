import { put, select } from "redux-saga/effects";
import Actions from "../store/actions";
import { API } from "../helpers/api";
import { history } from "./../routes";
import selectors from "./../selectors";

export function* watchAddPlaylist(action) {
  const response = yield API.playlists.addPlaylist(action.payload);

  if (response.status === 200) {
    if (response.data.status === "error") {
      yield put(
        Actions.common.setErrorNotify(response?.data?.message || "Server error")
      );
    } else {
      history.push("/content");
      const state = yield select();
      const onePlaylist = selectors.playlists.onePlaylist(state);

      yield put(Actions.playlists.getOnePlaylistRequest(onePlaylist.id));
      yield put(Actions.common.setSuccessNotify("Created successfully"));
    }
  } else {
    yield put(Actions.common.setErrorNotify(response.status + " Server error"));
  }
}

export function* watchDeletePlaylist(action) {
  const response = yield API.playlists.deletePlaylist(action.payload);
  console.log(response?.data);
  if (response.status === 200) {
    if (response.data.status === "error") {
      yield put(
        Actions.common.setErrorNotify(response?.data?.message || "Server error")
      );
    } else {
      const state = yield select();
      const onePlaylist = selectors.playlists.onePlaylist(state);

      yield put(Actions.playlists.getOnePlaylistRequest(onePlaylist.id));
      yield put(Actions.common.setSuccessNotify("Deleted successfully"));
    }
  } else {
    yield put(Actions.common.setErrorNotify(response.status + " Server error"));
  }
}

export function* watchUpdatePlaylist(action) {
  const response = yield API.playlists.updatePlaylist(action.payload);

  if (response.status === 200) {
    if (response.data.status === "error") {
      yield put(
        Actions.common.setErrorNotify(response?.data?.message || "Server error")
      );
    } else {
      const state = yield select();
      const onePlaylist = selectors.playlists.onePlaylist(state);

      yield put(Actions.playlists.getOnePlaylistRequest(onePlaylist?.id));
      yield put(Actions.common.setSuccessNotify("Updated successfully"));
    }
  } else {
    yield put(Actions.common.setErrorNotify(response.status + " Server error"));
  }
}

export function* watchGetPlaylists(action) {
  const response = yield API.playlists.getPlaylists(action.payload);
  console.log(response);
  if (response.status === 200) {
    if (response.data.status === "error") {
      yield put(
        Actions.common.setErrorNotify(response?.data?.message || "Server error")
      );
    } else {
      yield put(
        Actions.playlists.getPlaylistsSuccess(response?.data?.playlists)
      );
    }
  } else {
    yield put(Actions.common.setErrorNotify(response.status + " Server error"));
  }
}

export function* watchGetOnePlaylist(action) {
  const response = yield API.playlists.getOnePlaylist(action.payload);
  if (response.status === 200) {
    if (response.data.status === "error") {
      yield put(
        Actions.common.setErrorNotify(response?.data?.message || "Server error")
      );
    } else {
      yield put(
        Actions.playlists.getOnePlaylistSuccess(response?.data?.playlists[0])
      );
    }
  } else {
    yield put(Actions.common.setErrorNotify(response.status + " Server error"));
  }
}
