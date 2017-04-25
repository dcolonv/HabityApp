import React, { PropTypes } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

import { getTextHour } from '../utils'

export const HourField = ({ hour, size, selectedHour, onPress }) => {
  const style = hour === selectedHour ? styles.activeStyle : styles.pasiveStyle
  return (
    <TouchableHighlight onPress={() => { onPress(hour) }}>
      <View style={[styles.containerStyle, {height: size}, style]}>
        <Text style={styles.textStyle}>{getTextHour(hour)}</Text>
      </View>
    </TouchableHighlight>
  )
}

HourField.propTypes = {
  hour: PropTypes.number,
  size: PropTypes.number,
  selectedHour: PropTypes.number,
  onPress: PropTypes.func
}

const styles = {
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgb(200, 200, 200)'
  },
  activeStyle: {
    backgroundColor: 'rgb(230, 230, 230)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(200, 200, 200)',
    borderTopColor: 'rgb(200, 200, 200)'
  },
  pasiveStyle: {
    backgroundColor: 'rgb(255, 255, 255)'
  },
  textStyle: {
    fontSize: 16,
    color: 'rgb(130, 130, 130)'
  }
}

export default HourField
