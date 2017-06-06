import { validateAuthenticationForm, signUp, confirm, authenticate } from '../../helpers/cognitoHelper'
import { setRoute } from '../route/actions'

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

export const SET_VERIFICATION_CODE = 'auth/SET_VERIFICATION_CODE'
export const setVerificationCode = (verificationCode) => ({
  type: SET_VERIFICATION_CODE,
  payload: { verificationCode }
})

export const SET_CURRENT_USER = 'auth/SET_CURRENT_USER'
export const setCurrentUser = (currentUser) => ({
  type: SET_CURRENT_USER,
  payload: { currentUser }
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

// Signup user on cognito
export const register = (email, password) => {
  return (dispatch) => {
    validateAuthenticationForm(email, password)
      .then(() => {
        signUp(email, password)
        .then((result) => {
          console.log('register result', result)
          dispatch(resetForm())
          dispatch(setCurrentUser(result.user.getUsername()))
          if (!result.userConfirmed) {
            dispatch(setRoute('/confirm'))
          } else {
            dispatch(setRoute('/login'))
          }
        })
        .catch((err) => {
          let reason = err.message.split(':').pop() || ''
          // Replace text Member to Password to do the message clearer for the user
          reason = reason.replace('Member', 'Password')
          dispatch(setAuthenticationError(reason))
        })
      })
      .catch((reason) => {
        dispatch(setAuthenticationError(reason))
      })
  }
}

// Verify user on cognito
export const verify = (currentUser, verificationCode) => {
  return (dispatch) => {
    confirm(currentUser, verificationCode)
      .then((result) => {
        dispatch(resetForm())
        dispatch(setRoute('/login'))
        dispatch(setEmail(currentUser))
      })
      .catch((reason) => {
        dispatch(setAuthenticationError(reason))
      })
  }
}

// Authenticate user on cognito
export const login = (email, password) => {
  return (dispatch) => {
    authenticate(email, password)
      .then((result) => {
        console.log('login result', result)
        dispatch(resetForm())
        dispatch(setAuthentication(result))
      })
      .catch((reason) => {
        dispatch(setAuthenticationError(reason.message))
      })
  }
}
