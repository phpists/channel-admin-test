// import { createSelector } from 'reselect'
import { selector, deepEqualSelector } from '../common'

const self = deepEqualSelector(selector, data => data.playlists)
const playlists = deepEqualSelector(self, data => data.playlists)

export default {
  playlists,
}