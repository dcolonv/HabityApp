import { SET_ROUTE } from './actions'
import { LOGOUT } from '../auth/actions'

const INITIAL_STATE = ''

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_ROUTE:
      return payload.route
    case LOGOUT:
      return INITIAL_STATE
    default:
      return state
  }
}
