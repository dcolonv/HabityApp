import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image } from 'react-native'

import logoImage from '../assets/img/logobg.png'

export const Auth = ({authenticationError, children}) => {
  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#FFF'}}>
      <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
        <Image source={logoImage} />
      </View>
      <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
        <View style={{marginLeft: 20, marginRight: 30, marginBottom: 5, alignItems: 'center'}}>
          <Text style={{fontSize: 13, color: '#ee0f0f'}}>{authenticationError}</Text>
        </View>
        {children}
      </View>
    </View>
  )
}

Auth.propTypes = {
  children: PropTypes.object,
  authenticationError: PropTypes.string
}

const mapStateToProps = (state) => ({
  authenticationError: state.auth.error
})

export default connect(mapStateToProps)(Auth)
