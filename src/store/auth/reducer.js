import {
  SET_EMAIL,
  SET_PASSWORD,
  SET_USER,
  SET_VERIFICATION_CODE,
  SET_CURRENT_USERNAME,
  SET_AUTHENTICATION_ERROR,
  RESET_FORM,
  LOGOUT
} from './actions'

const INITIAL_STATE = {
  email: '',
  password: '',
  verificationCode: '',
  currentUsername: '',
  error: null,
  user: null
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_EMAIL:
      return {...state, email: payload.email}
    case SET_PASSWORD:
      return {...state, password: payload.password}
    case SET_VERIFICATION_CODE:
      return {...state, verificationCode: payload.verificationCode}
    case SET_CURRENT_USERNAME:
      return {...state, currentUsername: payload.currentUsername}
    case SET_AUTHENTICATION_ERROR:
      return {...state, error: payload.error}
    case SET_USER:
      return {...state, user: payload.user}
    case RESET_FORM:
      return {
        ...state,
        email: '',
        password: '',
        verificationCode: '',
        currentUsername: '',
        error: null
      }
    case LOGOUT:
      return INITIAL_STATE
    default:
      return state
  }
}
