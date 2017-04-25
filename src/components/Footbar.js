import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'

export class Footbar extends Component {
  onAddTaskPress () {
    this.props.addTask({
      id: 9,
      hour: this.props.selectedHour,
      minutes: 0,
      options: [{
        description: '',
        done: false
      }],
      completed: false,
      editing: true
    })
  }

  render () {
    return (
      <View>
        <View style={styles.containerStyle}>
          <View style={{width: 100}} />
        </View>
      </View>
    )
  }
}

Footbar.propTypes = {
  selectedHour: PropTypes.number,
  addTask: PropTypes.func
}

const styles = {
  containerStyle: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'rgb(41, 84, 158)'
  }
}

const mapStateToProps = (state) => ({
  selectedHour: state.selectedHour
})

export default connect(mapStateToProps)(Footbar)
