import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { setEmail, setPassword, authenticate } from '../store/auth/actions'
import { setRoute } from '../store/route/actions'

export class Login extends Component {
  onLoginClick () {
    const { email, password, authenticate } = this.props
    if (email && password) {
      authenticate(email, password)
    }
  }

  onLinkClick () {
    this.props.setRoute('/signup')
  }

  render () {
    const { email, password, setEmail, setPassword } = this.props
    return (
      <View>
        <View style={{marginLeft: 20, marginRight: 30, marginBottom: 20}}>
          <View style={{borderBottomWidth: 1, borderColor: 'gray', marginBottom: 10, flexDirection: 'row', alignItems: 'flex-start'}}>
            <MaterialIcon name='person-outline' size={30} color='gray' style={{marginTop: 5, marginRight: 20}} />
            <TextInput
              style={{height: 40, flex: 1}}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder='user@domain.com'
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={{borderBottomWidth: 1, borderColor: 'gray', marginBottom: 10, flexDirection: 'row', alignItems: 'flex-start'}}>
            <MaterialIcon name='lock-outline' size={30} color='gray' style={{marginTop: 5, marginRight: 20}} />
            <TextInput
              style={{height: 40, flex: 1}}
              autoCapitalize={'none'}
              autoCorrect={false}
              secureTextEntry
              placeholder='password'
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
        <TouchableOpacity onPress={this.onLoginClick.bind(this)}>
          <View style={{alignItems: 'center', margin: 10}}>
            <View style={styles.button}>
              <Text style={{color: '#FFF', fontSize: 18}}>Login</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{alignItems: 'center', margin: 10, marginBottom: 30}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 13}}>Do not have an account yet? </Text>
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
  backgroundImageStyle: {
    width: 350
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFF'
  },
  button: {
    width: 350,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#EE105E'
  }
}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
  authenticate: PropTypes.func,
  setRoute: PropTypes.func
}

const mapStateToProps = (state) => ({
  email: state.auth.email,
  password: state.auth.password
})

export default connect(mapStateToProps, { setEmail, setPassword, authenticate, setRoute })(Login)
