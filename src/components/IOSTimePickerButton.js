import React, { PropTypes } from 'react'
import { Text, TouchableOpacity } from 'react-native'

const IOSTimePickerButton = ({ onPress, title }) => {
  const { buttonStyle, textStyle } = styles

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
}

IOSTimePickerButton.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string
}

export default IOSTimePickerButton
