import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, Dimensions } from 'react-native'

import logoImage from '../assets/img/logobg.png'

export class Auth extends Component {
  constructor (props) {
    super(props)
    const orientation = Dimensions.get('window').height > Dimensions.get('window').width
      ? 'PORTRAIT' : 'LANDSCAPE'
    this.state = {
      orientation
    }
    this.getNewDimentions = this.getNewDimentions.bind(this)
  }

  getNewDimentions (event) {
    const orientation = event.nativeEvent.layout.height > event.nativeEvent.layout.width
      ? 'PORTRAIT' : 'LANDSCAPE'
    this.setState({
      orientation
    })
  }

  render () {
    const { authenticationError, children } = this.props
    const size = this.state.orientation === 'PORTRAIT' ? 330 : 110
    const marginTop = this.state.orientation === 'PORTRAIT' ? 50 : 0
    return (
      <View
        style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#FFF'}}
        onLayout={this.getNewDimentions}
      >
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop}}>
          <Image source={logoImage} style={{height: size, width: size}} />
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
          <View style={{marginLeft: 20, marginRight: 30, marginBottom: 5, alignItems: 'center'}}>
            <Text style={{fontSize: 13, color: '#ee0f0f'}}>{authenticationError}</Text>
          </View>
          {children}
        </View>
      </View>
    )
  }
}

Auth.propTypes = {
  children: PropTypes.object,
  authenticationError: PropTypes.string
}

const mapStateToProps = (state) => ({
  authenticationError: state.auth.error
})

export default connect(mapStateToProps)(Auth)
