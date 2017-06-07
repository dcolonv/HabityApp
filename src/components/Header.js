import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { logout } from '../store/auth/actions'

export class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }

  componentDidMount () {
    this.setState({date: new Date()})
  }

  onLogoutClick () {
    const { user, logout } = this.props
    logout(user)
  }

  render () {
    return (
      <View style={styles.containerStyle}>
        <View style={{flex: 1}} />
        <View style={{alignItems: 'center', flex: 8}}>
          <Text style={styles.textStyle}>{this.state.date.toDateString()}</Text>
        </View>
        <View style={{alignItems: 'center', flex: 1}}>
          <TouchableOpacity onPress={this.onLogoutClick.bind(this)}>
            <Icon name='exit-to-app' size={20} style={{color: 'rgb(230, 230, 230)'}} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(41, 84, 158)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    elevation: 3,
    position: 'relative'
  },
  textStyle: {
    color: 'rgb(230, 230, 230)'
  }
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps, {logout})(Header)
