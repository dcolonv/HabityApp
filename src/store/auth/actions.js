import { validateAuthenticationForm, signUp } from '../../helpers/cognitoHelper'

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

export const SET_CONFIRMATION_ID = 'auth/SET_CONFIRMATION_ID'
export const setConfirmationId = (confirmationId) => ({
  type: SET_CONFIRMATION_ID,
  payload: { confirmationId }
})

export const SET_AUTHENTICATION_ERROR = 'auth/SET_AUTHENTICATION_ERROR'
export const setAuthenticationError = (error) => ({
  type: SET_AUTHENTICATION_ERROR,
  payload: { error }
})

export const SET_AUTHENTICATION = 'auth/SET_AUTHENTICATION'
export const setAuthentication = (auth) => ({
  type: SET_AUTHENTICATION,
  payload: { auth }
})

export const RESET_FORM = 'auth/RESET_FORM'
export const resetForm = () => ({
  type: RESET_FORM
})

export const authenticate = (email, password) => {
  return (dispatch) => {
    // do authentication
    dispatch(resetForm())
    signUp(email, password)
    // dispatch(setAuthentication())
  }
}

export const register = (email, password) => {
  return (dispatch) => {
    validateAuthenticationForm(email, password)
      .then(() => {
        signUp(email, password)
        .then((result) => {
          dispatch(resetForm())
          console.log(result)
        })
        .catch((err) => {
          let reason = err.message.split(':').pop() || ''
          reason = reason.replace('Member', 'Password')
          dispatch(setAuthenticationError(reason))
        })
      })
      .catch((reason) => {
        dispatch(setAuthenticationError(reason))
      })
  }
}

export const confirm = (confirmationId) => {
  return (dispatch) => {
    // TODO: confirmation
  }
}
