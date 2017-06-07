import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool
} from '../lib/aws-cognito-identity'

import * as config from '../config'
import { isValidEmail } from '../utils'

const awsCognitoSettings = {
  UserPoolId: config.AWS_COGNITO_POOL_ID,
  ClientId: config.AWS_COGNITO_CLIENT_ID
}

const userPool = new CognitoUserPool(awsCognitoSettings)

export const validateAuthenticationForm = (email, password) => (
  new Promise((resolve, reject) => {
    if (!isValidEmail(email)) {
      reject(new Error('Email is not valid'))
    }
    if (password.length < 8) {
      reject(new Error('Password must be bigger than 8 characters'))
    }
    resolve()
  })
)

// Register an user to cognito
export const signUp = (email, password) => (
  new Promise((resolve, reject) => {
    const attributeList = [new CognitoUserAttribute({ Name: 'email', Value: email })]
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
)

// Verify an user into cognito
export const confirm = (currentUser, verificationCode) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: currentUser,
      Pool: userPool
    }
    const cognitoUser = new CognitoUser(userData)

    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

export const resendConfirmationCode = (user) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: user,
      Pool: userPool
    }
    const cognitoUser = new CognitoUser(userData)
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

export const signIn = (user, password) => {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: user,
      Pool: userPool
    }
    const cognitoUser = new CognitoUser(userData)

    const authDetails = new AuthenticationDetails({
      Username: user,
      Password: password
    })

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => resolve(cognitoUser),
      onFailure: reject
    })
  })
}

export const signOut = (cognitoUser) => {
  console.log('signOut', cognitoUser)
  cognitoUser.signOut((err, result) => {
    console.log('signOut callback', err, result)
  })
}
