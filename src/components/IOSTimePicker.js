import React, { Component, PropTypes } from 'react'
import { View, Modal, DatePickerIOS } from 'react-native'
import IOSTimePickerButton from './IOSTimePickerButton'

export class IOSTimePicker extends Component {
  constructor (props) {
    super(props)
    const date = new Date()
    const { hour, minutes } = this.props
    if (hour !== undefined && minutes !== undefined) {
      date.setHours(this.props.hour, this.props.minutes)
    }
    this.state = {
      date
    }
  }

  onDateChange (date) {
    this.setState({date: date})
  }

  onAccept () {
    const { date } = this.state
    this.props.onAccept(date.getHours(), date.getMinutes())
  }

  render () {
    const { cardSectionStyle, containerStyle, actionContainerStyle } = styles
    return (
      <Modal
        visible={this.props.visible}
        transparent
        animationType='slide'
        onRequestClose={() => {}}
      >
        <View style={containerStyle}>
          <View style={cardSectionStyle}>
            <DatePickerIOS
              date={this.state.date}
              mode='time'
              minuteInterval={10}
              onDateChange={this.onDateChange.bind(this)}
            />
            <View style={actionContainerStyle}>
              <IOSTimePickerButton onPress={this.props.onDecline} title='Cancel' />
              <IOSTimePickerButton onPress={this.onAccept.bind(this)} title='Accept' />
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

IOSTimePicker.propTypes = {
  visible: PropTypes.bool,
  hour: PropTypes.number,
  minutes: PropTypes.number,
  onAccept: PropTypes.func,
  onDecline: PropTypes.func
}

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  actionContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10
  }
}

export default IOSTimePicker
