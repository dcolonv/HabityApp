import { SET_SELECTED_HOUR } from './actions'

const date = new Date()
const INITIAL_STATE = date.getHours()

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SET_SELECTED_HOUR:
      return payload.hour
    default:
      return state
  }
}
