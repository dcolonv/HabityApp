import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import logoImage from '../assets/img/logobg.png'
import { setEmail, setPassword, register } from '../store/auth/actions'
import { setRoute } from '../store/route/actions'

export class Signup extends Component {
  onSignupClick () {
    const { email, password, register } = this.props
    register(email, password)
  }

  onLinkClick () {
    this.props.setRoute('/login')
  }

  render () {
    const { email, password, setEmail, setPassword } = this.props
    return (
      <View style={styles.container}>
        <View style={{flex: 1, width: null, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={logoImage} />
        </View>
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
        <TouchableOpacity onPress={this.onSignupClick.bind(this)}>
          <View style={{alignItems: 'center', margin: 10}}>
            <View style={styles.button}>
              <Text style={{color: '#FFF', fontSize: 18}}>Signup</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{alignItems: 'center', margin: 10, marginBottom: 30}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 13}}>Do you have an account? go back to </Text>
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
  backgroundImageStyle: {
    width: 350
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
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

Signup.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
  register: PropTypes.func,
  setRoute: PropTypes.func
}

const mapStateToProps = (state) => ({
  email: state.auth.email,
  password: state.auth.password
})

export default connect(mapStateToProps, { setEmail, setPassword, register, setRoute })(Signup)
