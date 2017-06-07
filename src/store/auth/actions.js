import {
  validateAuthenticationForm,
  signUp,
  confirm,
  resendConfirmationCode,
  signIn,
  signOut
} from '../../helpers/cognitoHelper'

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

export const SET_CURRENT_USERNAME = 'auth/SET_CURRENT_USERNAME'
export const setCurrentUsername = (currentUsername) => ({
  type: SET_CURRENT_USERNAME,
  payload: { currentUsername }
})

export const SET_AUTHENTICATION_ERROR = 'auth/SET_AUTHENTICATION_ERROR'
export const setAuthenticationError = (error) => ({
  type: SET_AUTHENTICATION_ERROR,
  payload: { error }
})

export const SET_USER = 'auth/SET_USER'
export const setUser = (user) => ({
  type: SET_USER,
  payload: { user }
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
          dispatch(resetForm())
          dispatch(setCurrentUsername(result.user.getUsername()))
          if (!result.userConfirmed) {
            alert('Sign Up Successful. Check your Email for a verification')
            dispatch(setRoute('/confirm'))
          } else {
            dispatch(setRoute('/login'))
          }
        })
        .catch((reason) => {
          let message = reason.message.split(':').pop() || ''
          // Replace text Member to Password to do the message clearer for the user
          message = message.replace('Member', 'Password')
          dispatch(setAuthenticationError(message))
        })
      })
      .catch((reason) => {
        dispatch(setAuthenticationError(reason.message))
      })
  }
}

// Verify user on cognito
export const verify = (currentUser, verificationCode) => {
  return (dispatch) => {
    confirm(currentUser, verificationCode)
      .then((result) => {
        alert('User verified. Proceed to Login')
        dispatch(resetForm())
        dispatch(setRoute('/login'))
        dispatch(setEmail(currentUser))
      })
      .catch((reason) => {
        dispatch(setAuthenticationError(reason.message))
      })
  }
}

// Rensend verification code
export const resendVerification = (email) => {
  return (dispatch) => {
    resendConfirmationCode(email)
      .then((result) => {
        alert('Code was sent again. Check your Email')
      })
      .catch((reason) => {
        dispatch(setAuthenticationError(reason.message))
      })
  }
}

// Authenticate user on cognito
export const login = (email, password) => {
  return (dispatch) => {
    signIn(email, password)
      .then((user) => {
        dispatch(resetForm())
        dispatch(setUser(user))
        dispatch(setRoute('/daily'))
      })
      .catch((reason) => {
        dispatch(setAuthenticationError(reason.message))
      })
  }
}

export const LOGOUT = 'auth/LOGOUT'
export const logout = (cognitoUser) => {
  return (dispatch) => {
    signOut(cognitoUser)
    dispatch({type: LOGOUT})
    dispatch(resetForm())
  }
}
