import AWS from 'aws-sdk/dist/aws-sdk-react-native'
// import AWSCognito from '../assets/lib/amazon-cognito-identity-react-native.min.js'
import * as config from '../config'

const myCredentials = new AWS.CognitoIdentityCredentials({ IdentityPoolId: config.AWS_COGNITO_POOL_ID })

AWS.config.update({
  region: config.AWS_REGION,
  credentials: myCredentials
})

export const signUp = (email, password) => {
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
      console.error(err)
    }
    console.log('signed up')
  })
}
