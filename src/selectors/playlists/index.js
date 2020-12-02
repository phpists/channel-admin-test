// import { createSelector } from 'reselect'
import { selector, deepEqualSelector } from '../common'

const self = deepEqualSelector(selector, data => data.playlists)
const playlists = deepEqualSelector(self, data => data.playlists)
const onePlaylist = deepEqualSelector(self, data => data.onePlaylist)
const dragedPlaylist = deepEqualSelector(self, data => data.dragedPlaylist)

export default {
  playlists,
  onePlaylist,
  dragedPlaylist
}