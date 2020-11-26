// import { createSelector } from 'reselect'
import { selector, deepEqualSelector } from '../common'

const self = deepEqualSelector(selector, data => data.playlists)
const playlists = deepEqualSelector(self, data => data.playlists)
const activePlaylist = deepEqualSelector(self, data => data.activePlaylist)

export default {
  playlists,
  activePlaylist
}