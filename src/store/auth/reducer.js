import {
  SET_EMAIL,
  SET_PASSWORD,
  SET_AUTHENTICATION,
  SET_VERIFICATION_CODE,
  SET_CURRENT_USER,
  SET_AUTHENTICATION_ERROR,
  RESET_FORM,
  LOGOUT
} from './actions'

const INITIAL_STATE = {
  email: '',
  password: '',
  verificationCode: '',
  currentUser: '',
  error: null,
  auth: null
}

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_EMAIL:
      return {...state, email: payload.email}
    case SET_PASSWORD:
      return {...state, password: payload.password}
    case SET_VERIFICATION_CODE:
      return {...state, verificationCode: payload.verificationCode}
    case SET_CURRENT_USER:
      return {...state, currentUser: payload.currentUser}
    case SET_AUTHENTICATION_ERROR:
      return {...state, error: payload.error}
    case SET_AUTHENTICATION:
      return {...state, auth: payload.auth}
    case RESET_FORM:
      return {
        ...state,
        email: '',
        password: '',
        verificationCode: '',
        currentUser: '',
        error: null
      }
    case LOGOUT:
      return INITIAL_STATE
    default:
      return state
  }
}
