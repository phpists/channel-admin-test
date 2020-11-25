import { Types } from './actions'

const initialState = {
  channels: null,
  activeChannel: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_CHANNELS_SUCCESS: {
      return {
        ...state, ...{
          channels: action.payload,
        }
      }
    }
    case Types.SET_ACTIVE_CHANNEL: {
      return {
        ...state, ...{
          activeChannel: action.payload,
        }
      }
    }
    default: return state
  }
}

export default reducer
