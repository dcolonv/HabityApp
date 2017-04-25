import { SET_ROUTE } from './actions'

const INITIAL_STATE = ''

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_ROUTE:
      return payload.route
    default:
      return state
  }
}
