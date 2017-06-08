import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Auth from './views/Auth'
import Login from './views/Login'
import Signup from './views/Signup'
import Confirm from './views/Confirm'
import Recover from './views/Recover'
import ConfirmRecovery from './views/ConfirmRecovery'
import Main from './views/Main'
import Daily from './views/Daily'

const Router = ({ route }) => {
  switch (route) {
    case '/login':
      return <Auth><Login /></Auth>
    case '/signup':
      return <Auth><Signup /></Auth>
    case '/confirm':
      return <Auth><Confirm /></Auth>
    case '/recover':
      return <Auth><Recover /></Auth>
    case '/confirmRecovery':
      return <Auth><ConfirmRecovery /></Auth>
    case '/daily':
      return <Main><Daily /></Main>
    default:
      return <Auth><Login /></Auth>
  }
}

Router.propTypes = {
  route: PropTypes.string
}

const mapStateToProps = (state) => ({
  route: state.route
})

export default connect(mapStateToProps)(Router)
