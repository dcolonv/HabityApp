import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableWithoutFeedback, Vibration } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import TaskHourItem from './TaskHourItem'

import { toggleTaskOptionDone } from '../store/tasks/actions'
import { setEditingTask } from '../store/editingTask/actions'

import styles from '../assets/taskItemStyles'

const {
  containerStyle,
  headerStyle,
  editButtonStyle,
  taskOptionStyle,
  taskDescriptionTextStyle,
  checkboxStyle,
  defaultIconStyle
} = styles

export const TaskItem = ({ task, toggleTaskOptionDone, setEditingTask }) => {
  const onTaskEditPress = () => {
    setEditingTask(task)
  }

  const onTaskLongPress = () => {
    Vibration.vibrate()
    onTaskEditPress()
  }

  const renderTaskOptions = () => {
    return task.options && task.options.map((option, optionIndex) => (
      <View key={optionIndex} style={taskOptionStyle}>
        <Text style={taskDescriptionTextStyle}>{option.description}</Text>
        <View style={{ justifyContent: 'space-around' }}>
          <TouchableWithoutFeedback onPress={() => { toggleTaskOptionDone(task, optionIndex) }}>
            <View style={checkboxStyle}>
              {option.done && <Icon name='done' size={19} style={defaultIconStyle} />}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    ))
  }

  return (
    <TouchableWithoutFeedback delayLongPress={1000} onLongPress={onTaskLongPress}>
      <View style={containerStyle}>
        <View style={headerStyle}>
          <TaskHourItem hour={task.hour} minutes={task.minutes} />
          <Text style={{marginLeft: -20}}>{task.title}</Text>
          <TouchableWithoutFeedback onPress={onTaskEditPress}>
            <View style={editButtonStyle}>
              <Icon name='create' size={20} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {renderTaskOptions()}
      </View>
    </TouchableWithoutFeedback>
  )
}

TaskItem.propTypes = {
  task: PropTypes.object,
  index: PropTypes.number,
  toggleTaskOptionDone: PropTypes.func,
  setEditingTask: PropTypes.func
}

export default connect(null, { toggleTaskOptionDone, setEditingTask })(TaskItem)
