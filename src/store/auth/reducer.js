import {
  SET_EMAIL,
  SET_PASSWORD,
  SET_AUTHENTICATION,
  SET_CONFIRMATION_ID,
  SET_AUTHENTICATION_ERROR,
  RESET_FORM
} from './actions'

const INITIAL_STATE = {
  email: '',
  password: '',
  confirmationId: '',
  error: null,
  auth: null
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_EMAIL:
      return {...state, email: payload.email}
    case SET_PASSWORD:
      return {...state, password: payload.password}
    case SET_CONFIRMATION_ID:
      return {...state, confirmationId: payload.confirmationId}
    case SET_AUTHENTICATION_ERROR:
      return {...state, error: payload.error}
    case SET_AUTHENTICATION:
      return {...state, auth: payload.auth}
    case RESET_FORM:
      return {
        ...state,
        email: '',
        password: '',
        confirmationId: '',
        error: null
      }
    default:
      return state
  }
}
