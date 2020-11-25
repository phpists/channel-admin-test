import authorization from './authorization/actions'
import common from './common/actions'
import profile from './profile/actions'
import channels from './channels/actions'
import playlists from './playlists/actions'

export * from './layout/actions';

export default {
  authorization,
  common,
  profile,
  channels,
  playlists
}
