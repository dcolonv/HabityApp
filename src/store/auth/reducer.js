import { SET_USERNAME, SET_PASSWORD, SET_AUTHENTICATION } from './actions'

const INITIAL_STATE = {
  email: '',
  password: '',
  auth: null
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_USERNAME:
      return {...state, email: payload.email}
    case SET_PASSWORD:
      return {...state, password: payload.password}
    case SET_AUTHENTICATION:
      return {...state, auth: payload.auth}
    default:
      return state
  }
}
