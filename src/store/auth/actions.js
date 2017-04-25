import { signUp } from '../../helpers/cognitoHelper'

export const SET_EMAIL = 'auth/SET_EMAIL'
export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: { email }
})

export const SET_PASSWORD = 'auth/SET_PASSWORD'
export const setPassword = (password) => ({
  type: SET_PASSWORD,
  payload: { password }
})

export const SET_AUTHENTICATION = 'auth/SET_AUTHENTICATION'
export const setAuthentication = (auth) => ({
  type: SET_AUTHENTICATION,
  payload: { auth }
})

export const authenticate = (email, password) => {
  return (dispatch) => {
    // do authentication
    signUp(email, password)
    // dispatch(setAuthentication())
  }
}

export const register = (email, password) => {
  return (dispatch) => {
    signUp(email, password)
  }
}
