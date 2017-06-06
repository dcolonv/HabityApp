import AWS from 'aws-sdk/dist/aws-sdk-react-native'
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
      reject('Email is not valid')
    }
    if (password.length < 8) {
      reject('Password must be bigger than 8 characters')
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

export const authenticate = (user, password) => {
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
      onSuccess: resolve,
      onFailure: reject
    })
  })
}
