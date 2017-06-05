import AWS from 'aws-sdk/dist/aws-sdk-react-native'
// import AWSCognito from '../assets/lib/amazon-cognito-identity-react-native.min.js'
import * as config from '../config'
import { isValidEmail } from '../utils'

const myCredentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: config.AWS_COGNITO_POOL_ID })

AWS.config.update({
  region: config.AWS_REGION,
  credentials: myCredentials
})

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

export const signUp = (email, password) => (
  new Promise((resolve, reject) => {
    const userPool = new AWS.CognitoIdentityServiceProvider()
    const params = {
      ClientId: config.AWS_COGNITO_CLIENT_ID,
      Password: password, /* required */
      Username: email, /* required */
      UserAttributes: [
        {
          Name: 'email', /* required */
          Value: email
        }
      ]
    }
    userPool.signUp(params, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve('signed up')
    })
  })
)
