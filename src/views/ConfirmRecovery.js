import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { setVerificationCode, setPassword, verifyRecovery } from '../store/auth/actions'

export class ConfirmRecovery extends Component {
  onConfirmationClick () {
    const { verificationCode, password, currentUsername, verifyRecovery } = this.props
    if (currentUsername && verificationCode) {
      verifyRecovery(currentUsername, verificationCode, password)
    }
  }

  render () {
    const { verificationCode, password, setVerificationCode, setPassword, currentUsername } = this.props
    return (
      <View>
        <View style={{marginLeft: 25, marginRight: 25, marginBottom: 10}}>
          <View style={{borderBottomWidth: 1, borderColor: 'gray', marginBottom: 10, flexDirection: 'row', alignItems: 'flex-start'}}>
            <MaterialIcon name='perm-device-information' size={30} color='gray' style={{marginTop: 5, marginRight: 20}} />
            <TextInput
              style={{height: 40, flex: 1}}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder='confirmation number'
              value={verificationCode}
              onChangeText={setVerificationCode}
            />
          </View>
          <View style={{borderBottomWidth: 1, borderColor: 'gray', marginBottom: 10, flexDirection: 'row', alignItems: 'flex-start'}}>
            <MaterialIcon name='lock-outline' size={30} color='gray' style={{marginTop: 5, marginRight: 20}} />
            <TextInput
              style={{height: 40, flex: 1}}
              autoCapitalize={'none'}
              autoCorrect={false}
              secureTextEntry
              placeholder='new password'
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 13}}>Verification code sent to {currentUsername}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={this.onConfirmationClick.bind(this)}>
          <View style={{alignItems: 'center', margin: 10}}>
            <View style={styles.button}>
              <Text style={{color: '#FFF', fontSize: 18}}>Change Password</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  button: {
    width: 350,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#EE105E'
  }
}

ConfirmRecovery.propTypes = {
  verificationCode: PropTypes.string,
  password: PropTypes.string,
  currentUsername: PropTypes.string,
  setVerificationCode: PropTypes.func,
  setPassword: PropTypes.func,
  verifyRecovery: PropTypes.func
}

const mapStateToProps = (state) => ({
  verificationCode: state.auth.verificationCode,
  password: state.auth.password,
  currentUsername: state.auth.currentUsername
})

export default connect(mapStateToProps, {
  setVerificationCode,
  setPassword,
  verifyRecovery
})(ConfirmRecovery)
