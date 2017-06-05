import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import logoImage from '../assets/img/logobg.png'
import { setConfirmationId, confirm } from '../store/auth/actions'
import { setRoute } from '../store/route/actions'

export class Confirm extends Component {
  onConfirmationClick () {
    const { confirmationId } = this.props
    confirm(confirmationId)
  }

  onLinkClick () {
    this.props.setRoute('/login')
  }

  render () {
    const { confirmationId, setConfirmationId } = this.props
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
          <Image source={logoImage} />
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
          <View style={{marginLeft: 20, marginRight: 30, marginBottom: 20}}>
            <View style={{borderBottomWidth: 1, borderColor: 'gray', marginBottom: 10, flexDirection: 'row', alignItems: 'flex-start'}}>
              <MaterialIcon name='perm-device-information' size={30} color='gray' style={{marginTop: 5, marginRight: 20}} />
              <TextInput
                style={{height: 40, flex: 1}}
                autoCapitalize={'none'}
                autoCorrect={false}
                placeholder='confirmation number'
                value={confirmationId}
                onChangeText={setConfirmationId}
              />
            </View>
          </View>
          <TouchableOpacity onPress={this.onConfirmationClick.bind(this)}>
            <View style={{alignItems: 'center', margin: 10}}>
              <View style={styles.button}>
                <Text style={{color: '#FFF', fontSize: 18}}>Confirm</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{alignItems: 'center', margin: 10, marginBottom: 30}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 13}}>Did not receive a confirmation number? go back to </Text>
              <TouchableOpacity onPress={this.onLinkClick.bind(this)}>
                <Text style={{fontSize: 13, color: '#EE105E'}}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = {
  backgroundImageStyle: {
    width: 350
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFF'
  },
  button: {
    width: 350,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#EE105E'
  }
}

Confirm.propTypes = {
  confirmationId: PropTypes.string,
  setConfirmationId: PropTypes.func,
  confirm: PropTypes.func,
  setRoute: PropTypes.func
}

const mapStateToProps = (state) => ({
  confirmationId: state.auth.confirmationId
})

export default connect(mapStateToProps, { setConfirmationId, confirm, setRoute })(Confirm)
