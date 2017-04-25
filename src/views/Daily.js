import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import ActionButton from 'react-native-action-button'

import HoursColumn from '../components/HoursColumn'
import TasksColumn from '../components/TasksColumn'

import { setNewEditingTask } from '../store/editingTask/actions'

export class Daily extends Component {

  // no re-render because is not needed
  shouldComponentUpdate (nextProps) {
    return false
  }

  render () {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <HoursColumn />
        <TasksColumn />
        <ActionButton
          buttonColor='#EE105E'
          offsetX={10}
          offsetY={10}
          onPress={() => { this.props.setNewEditingTask(this.props.selectedHour) }}
        />
      </View>
    )
  }
}

Daily.propTypes = {
  selectedHour: PropTypes.number,
  setNewEditingTask: PropTypes.func
}

const mapStateToProps = (state) => ({
  selectedHour: state.selectedHour
})

export default connect(mapStateToProps, { setNewEditingTask })(Daily)
