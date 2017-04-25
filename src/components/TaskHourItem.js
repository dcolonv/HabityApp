import React, { PropTypes } from 'react'
import { Text } from 'react-native'

import { getTextHourMinutes } from '../utils'

export const TaskHourItem = ({ hour, minutes }) => {
  return (
    <Text style={styles.hourTextStyle}>{getTextHourMinutes(hour, minutes)}</Text>
  )
}

TaskHourItem.propTypes = {
  hour: PropTypes.number,
  minutes: PropTypes.number
}

const styles = {
  hourTextStyle: {
    fontSize: 14
  }
}

export default TaskHourItem
