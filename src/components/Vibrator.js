import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Platform, Vibration } from 'react-native'

export const Vibrator = () => {

  return null
}

Vibrator.propTypes = {
  vibrate: PropTypes.bool
}

export default connect()(Vibrator)
