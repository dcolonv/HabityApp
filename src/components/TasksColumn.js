import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'

import TaskItem from './TaskItem'
import TaskItemForm from './TaskItemForm'

export class TasksColumn extends Component {
  renderNewTask () {
    const { editingTask, selectedHour } = this.props
    if (editingTask && editingTask.isNew && editingTask.hour === selectedHour) {
      return <TaskItemForm task={editingTask} />
    }
  }

  renderTasks () {
    const { selectedHour, editingTask, tasks } = this.props
    const filteredTasks = tasks.filter((task) => (task.hour === selectedHour))
    return filteredTasks && filteredTasks.map((task, index) => {
      if (editingTask && !editingTask.isNew && editingTask.id === task.id) {
        return <TaskItemForm key={index} task={editingTask} />
      }
      return <TaskItem key={index} task={task} />
    })
  }

  render () {
    return (
      <ScrollView style={styles.containerStyle} keyboardShouldPersistTaps='always'>
        { this.renderNewTask() }
        { this.renderTasks() }
      </ScrollView>
    )
  }
}

TasksColumn.propTypes = {
  tasks: PropTypes.array,
  editingTask: PropTypes.object,
  newTask: PropTypes.object,
  selectedHour: PropTypes.number
}

const styles = {
  containerStyle: {
    minWidth: 290,
    backgroundColor: 'rgb(240, 240, 240)'
  }
}

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  editingTask: state.editingTask,
  selectedHour: state.selectedHour
})

export default connect(mapStateToProps)(TasksColumn)
