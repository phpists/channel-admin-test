// import { createSelector } from 'reselect'
import { selector, deepEqualSelector } from "../common";

const self = deepEqualSelector(selector, (data) => data.videos);
const videos = deepEqualSelector(self, (data) => data.videos);
const videosByPlaylist = deepEqualSelector(
  self,
  (data) => data.videosByPlaylist
);

export default {
  videos,
  videosByPlaylist,
};