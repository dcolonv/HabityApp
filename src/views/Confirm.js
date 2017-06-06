import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { setVerificationCode, verify, resetForm } from '../store/auth/actions'
import { setRoute } from '../store/route/actions'

export class Confirm extends Component {
  onConfirmationClick () {
    const { verificationCode, currentUser, verify } = this.props
    if (currentUser && verificationCode) {
      verify(currentUser, verificationCode)
    }
  }

  onResendClick () {

  }

  onLinkClick () {
    const { setRoute, resetForm } = this.props
    setRoute('/signup')
    resetForm()
  }

  render () {
    const { verificationCode, setVerificationCode, currentUser } = this.props
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
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 13}}>Verification code sent to {currentUser}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={this.onConfirmationClick.bind(this)}>
          <View style={{alignItems: 'center', margin: 10}}>
            <View style={styles.button}>
              <Text style={{color: '#FFF', fontSize: 18}}>Confirm</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{alignItems: 'center', margin: 10, marginBottom: 30}}>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text style={{fontSize: 13}}>Did not get the code? </Text>
            <TouchableOpacity onPress={this.onResendClick.bind(this)}>
              <Text style={{fontSize: 13, color: '#EE105E'}}>Resend</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 13}}>Incorrect email? go back to </Text>
            <TouchableOpacity onPress={this.onLinkClick.bind(this)}>
              <Text style={{fontSize: 13, color: '#EE105E'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
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

Confirm.propTypes = {
  verificationCode: PropTypes.string,
  setVerificationCode: PropTypes.func,
  currentUser: PropTypes.string,
  verify: PropTypes.func,
  setRoute: PropTypes.func,
  resetForm: PropTypes.func
}

const mapStateToProps = (state) => ({
  verificationCode: state.auth.verificationCode,
  currentUser: state.auth.currentUser
})

export default connect(mapStateToProps, {
  setVerificationCode,
  verify,
  setRoute,
  resetForm
})(Confirm)
