import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, TouchableWithoutFeedback, Platform, TimePickerAndroid, Text, TextInput } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import IOSTimePicker from './IOSTimePicker'
import TaskHourItem from './TaskHourItem'

import { updateTask, removeTask } from '../store/tasks/actions'
import { removeEditingTask } from '../store/editingTask/actions'

import styles from '../assets/taskItemStyles'

export class TaskItemForm extends Component {
  constructor (props) {
    super(props)
    const { hour, minutes, title, options } = this.props.task
    this.state = {
      hour,
      minutes,
      title,
      options: [...options],
      showTimePicker: false,
      selectedOptionIndex: 0
    }
  }

  openTimeSelector () {
    if (Platform.OS === 'ios') {
      return this.setState({showTimePicker: true})
    }

    TimePickerAndroid.open({
      hour: this.state.hour,
      minute: this.state.minutes,
      is24Hour: false
    }).then(({ action, hour, minute }) => {
      if (action !== TimePickerAndroid.dismissedAction) {
        this.onSelectHour(hour, minute)
      }
    })
  }

  onSelectHour (hour, minutes) {
    this.setState({
      hour,
      minutes: minutes,
      showTimePicker: false
    })
  }

  selectOptionToEdit (option, index) {
    this.setState({
      selectedOptionIndex: index
    })
  }

  onTitleTextInputChange (text) {
    this.setState({title: text})
  }

  onOptionTextInputChange (text) {
    this.setState({
      options: [
        ...this.state.options.slice(0, this.state.selectedOptionIndex),
        {...this.state.options[this.state.selectedOptionIndex], description: text},
        ...this.state.options.slice(this.state.selectedOptionIndex + 1)
      ]
    })
  }

  onAddOption () {
    this.setState({
      options: [...this.state.options, { description: '', done: false }],
      selectedOptionIndex: this.state.options.length
    })
  }

  onRemoveOption () {
    if (this.state.options.length) {
      this.setState({
        options: [
          ...this.state.options.slice(0, this.state.selectedOptionIndex),
          ...this.state.options.slice(this.state.selectedOptionIndex + 1)
        ],
        selectedOptionIndex: this.state.selectedOptionIndex > 0 ? this.state.selectedOptionIndex - 1 : 0
      })
    } else {
      this.props.removeTask(this.props.task.id)
      this.props.removeEditingTask()
    }
  }

  onSaveTask () {
    const { task } = this.props
    // only save options with description.
    const optionsToSave = this.state.options.filter((option) => {
      return !!option.description.trim()
    })

    const { title, hour, minutes } = this.state
    if ((!optionsToSave || !optionsToSave.length) && (!title || !title.trim().length)) {
      this.props.removeTask(task.id)
    } else {
      this.props.updateTask({
        ...task,
        title,
        hour,
        minutes,
        options: optionsToSave,
        isNew: false
      })
    }

    this.props.removeEditingTask()
  }

  renderTaskOptions () {
    const {
      editableTaskOptionStyle,
      taskDescriptionTextStyle,
      taskDescriptionInputTextStyle
    } = styles

    const { options, selectedOptionIndex } = this.state
    return options && options.map((option, optionIndex) => {
      if (optionIndex === selectedOptionIndex) {
        return (
          <View key={optionIndex} style={editableTaskOptionStyle}>
            <TextInput
              multiline
              numberOfLines={4}
              maxLength={200}
              placeholder='Task Option'
              underlineColorAndroid={'transparent'}
              style={taskDescriptionInputTextStyle}
              value={options[selectedOptionIndex].description}
              onChangeText={this.onOptionTextInputChange.bind(this)}
            />
          </View>
        )
      }
      return (
        <TouchableWithoutFeedback key={optionIndex} onPress={() => this.selectOptionToEdit(option, optionIndex)}>
          <View>
            <Text style={taskDescriptionTextStyle}>{option.description}</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    })
  }

  render () {
    const { hour, minutes, title, options } = this.state
    const {
      containerStyle,
      headerStyle,
      footerStyle,
      alarmIconStyle,
      editButtonStyle,
      editActiveButtonStyle,
      defaultIconStyle,
      dangerIconStyle,
      editableTitleStyle
    } = styles

    return (
      <View style={containerStyle}>
        <IOSTimePicker
          visible={this.state.showTimePicker}
          hour={hour}
          minutes={minutes}
          onAccept={this.onSelectHour.bind(this)}
          onDecline={() => this.setState({showTimePicker: false})}
        />
        <View style={headerStyle}>
          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            <TouchableWithoutFeedback onPress={this.openTimeSelector.bind(this)}>
              <View style={{flexDirection: 'row'}}>
                <TaskHourItem hour={hour} minutes={minutes} />
                <MaterialIcon name='alarm' size={19} style={alarmIconStyle} />
              </View>
            </TouchableWithoutFeedback>
            <View style={editableTitleStyle}>
              <TextInput
                style={{minWidth: 160, fontSize: 13, minHeight: 25}}
                placeholder='Task'
                value={title}
                maxLength={20}
                underlineColorAndroid={'transparent'}
                onChangeText={this.onTitleTextInputChange.bind(this)}
              />
            </View>
          </View>
          <TouchableWithoutFeedback onPress={this.onSaveTask.bind(this)}>
            <View style={editButtonStyle}>
              <MaterialIcon name='save' size={20} style={editActiveButtonStyle} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {this.renderTaskOptions()}
        <View style={footerStyle}>
          <TouchableWithoutFeedback onPress={this.onAddOption.bind(this)}>
            <MaterialIcon name='playlist-add' size={22} style={defaultIconStyle} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.onRemoveOption.bind(this)}>
            {
              options && options.length
              ? <MaterialIcon name='remove-circle' size={22} style={dangerIconStyle} />
              : <MaterialIcon name='delete-forever' size={22} style={dangerIconStyle} />
            }
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

TaskItemForm.propTypes = {
  task: PropTypes.object,
  index: PropTypes.number,
  addTask: PropTypes.func,
  updateTask: PropTypes.func,
  removeTask: PropTypes.func,
  removeEditingTask: PropTypes.func
}

export default connect(null, { updateTask, removeTask, removeEditingTask })(TaskItemForm)
