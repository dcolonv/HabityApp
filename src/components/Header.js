import React, { Component } from 'react'
import { View, Text } from 'react-native'

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

  render () {
    return (
      <View style={styles.containerStyle}>
        <Text style={styles.textStyle}>{this.state.date.toDateString()}</Text>
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
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

export default Header
