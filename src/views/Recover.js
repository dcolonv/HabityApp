import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { setEmail, recoverPassword, resetForm } from '../store/auth/actions'
import { setRoute } from '../store/route/actions'

export class Recover extends Component {
  onRecoverClick () {
    const { email, recoverPassword } = this.props
    if (email) {
      recoverPassword(email)
    }
  }

  onLinkClick () {
    const { setRoute, resetForm } = this.props
    setRoute('/login')
    resetForm()
  }

  render () {
    const { email, setEmail } = this.props
    return (
      <View>
        <View style={{marginLeft: 25, marginRight: 25, marginBottom: 10}}>
          <View style={{borderBottomWidth: 1, borderColor: 'gray', marginBottom: 10, flexDirection: 'row', alignItems: 'flex-start'}}>
            <MaterialIcon name='lock-open' size={30} color='gray' style={{marginTop: 5, marginRight: 20}} />
            <TextInput
              style={{height: 40, flex: 1}}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder='user@domain.com'
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>
        <TouchableOpacity onPress={this.onRecoverClick.bind(this)}>
          <View style={{alignItems: 'center', margin: 10}}>
            <View style={styles.button}>
              <Text style={{color: '#FFF', fontSize: 18}}>Recover Password</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{alignItems: 'center', margin: 10, marginBottom: 30}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 13}}>Did you remember? go back to </Text>
            <TouchableOpacity onPress={this.onLinkClick.bind(this)}>
              <Text style={{fontSize: 13, color: '#EE105E'}}>Login</Text>
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

Recover.propTypes = {
  email: PropTypes.string,
  setEmail: PropTypes.func,
  recoverPassword: PropTypes.func,
  setRoute: PropTypes.func,
  resetForm: PropTypes.func
}

const mapStateToProps = (state) => ({
  email: state.auth.email
})

export default connect(mapStateToProps, {
  setEmail,
  recoverPassword,
  setRoute,
  resetForm
})(Recover)
