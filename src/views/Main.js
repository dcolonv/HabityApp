import React, { PropTypes } from 'react'
import { View, Platform } from 'react-native'

import Header from '../components/Header'

export const Main = ({ children }) => {
  return (
    <View style={styles.appStyle}>
      <Header />
      {children}
    </View>
  )
}

Main.propTypes = {
  children: PropTypes.object
}

const styles = {
  appStyle: {
    flex: 1,
    width: null,
    backgroundColor: 'rgb(240, 240, 240)',
    ...Platform.select({
      ios: {
        marginTop: 20
      }
    })
  }
}

export default Main
