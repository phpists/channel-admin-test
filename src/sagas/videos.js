import { put } from "redux-saga/effects";
import Actions from "../store/actions";
import { API } from "../helpers/api";
import { history } from "./../routes";

export function* watchAddVideoToPlaylist(action) {
  const response = yield API.videos.addVideoToPlaylist(action.payload);

  if (response.status === 200) {
    if (response.data.status === "error") {
      yield put(
        Actions.common.setErrorNotify(response?.data?.message || "Server error")
      );
    } else {
      history.push("/content");

      yield put(Actions.common.setSuccessNotify("Added successfully"));
    }
  } else {
    yield put(Actions.common.setErrorNotify(response.status + " Server error"));
  }
}

export function* watchRemoveVideoFromPlaylist(action) {
  const response = yield API.videos.removeVideoFromPlaylist(action.payload);
  console.log(response?.data);
  if (response.status === 200) {
    if (response.data.status === "error") {
      yield put(
        Actions.common.setErrorNotify(response?.data?.message || "Server error")
      );
    } else {

      yield put(Actions.common.setSuccessNotify("Removed successfully"));
    }
  } else {
    yield put(Actions.common.setErrorNotify(response.status + " Server error"));
  }
}

export function* watchUpdateVideo(action) {
  const response = yield API.videos.updateVideo(action.payload);

  if (response.status === 200) {
    if (response.data.status === "error") {
      yield put(
        Actions.common.setErrorNotify(response?.data?.message || "Server error")
      );
    } else {

      yield put(Actions.common.setSuccessNotify("Updated successfully"));
    }
  } else {
    yield put(Actions.common.setErrorNotify(response.status + " Server error"));
  }
}

export function* watchGetVideos() {
  const response = yield API.videos.getVideos();
  console.log(response);
  if (response.status === 200) {
    if (response.data.status === "error") {
      yield put(
        Actions.common.setErrorNotify(response?.data?.message || "Server error")
      );
    } else {
      yield put(
        Actions.videos.getVideosSuccess(response?.data?.playlists)
      );
    }
  } else {
    yield put(Actions.common.setErrorNotify(response.status + " Server error"));
  }
}

export function* watchGetVideoByPlaylists() {
  const response = yield API.videos.getVideosByPlaylists();
  if (response.status === 200) {
    if (response.data.status === "error") {
      yield put(
        Actions.common.setErrorNotify(response?.data?.message || "Server error")
      );
    } else {
      yield put(
        Actions.videos.getVideoByPlaylistSuccess(response?.data?.playlists[0])
      );
    }
  } else {
    yield put(Actions.common.setErrorNotify(response.status + " Server error"));
  }
}
