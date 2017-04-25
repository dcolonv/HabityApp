import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ScrollView, InteractionManager } from 'react-native'

import HourItem from './HourItem'
import { setSelectedHour } from '../store/selectedHour/actions'

const listComponentSize = 70

export class HoursColumn extends Component {

  componentDidMount () {
    // Execute after interactions
    InteractionManager.runAfterInteractions(() => {
      // Size of the element by hours divided by 1.25 to left the element in the middle of th page
      if (this.props.selectedHour > 3) {
        if (this.props.selectedHour < 19) {
          setTimeout(() => {
            this.refs.hourScroll.scrollTo({ y: ((this.props.selectedHour - 3) * listComponentSize) })
          }, 0)
        } else {
          setTimeout(() => {
            this.refs.hourScroll.scrollToEnd()
          }, 0)
        }
      }
    })
  }

  renderHours () {
    let hoursList = []
    for (let hour = 0; hour < 24; hour++) {
      hoursList.push(
        <HourItem
          key={hour}
          size={listComponentSize}
          hour={hour}
          selectedHour={this.props.selectedHour}
          onPress={this.props.setSelectedHour}
        />)
    }
    return hoursList
  }

  render () {
    return (
      <ScrollView ref='hourScroll' style={styles.hoursColumnStyle}>
        {this.renderHours()}
      </ScrollView>
    )
  }
}

const styles = {
  hoursColumnStyle: {
    width: 65,
    minWidth: 65
  }
}

HoursColumn.propTypes = {
  selectedHour: PropTypes.number,
  setSelectedHour: PropTypes.func
}

const mapStateToProps = (state) => ({
  selectedHour: state.selectedHour
})

export default connect(mapStateToProps, { setSelectedHour })(HoursColumn)
