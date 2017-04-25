import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Login from './views/Login'
import Signup from './views/Signup'
import Main from './views/Main'
import Daily from './views/Daily'

const Router = ({ route }) => {
  switch (route) {
    case '/login':
      return <Login />
    case '/signup':
      return <Signup />
    case '/daily':
      return <Main><Daily /></Main>
    default:
      return <Login />
  }
}

Router.propTypes = {
  route: PropTypes.string
}

const mapStateToProps = (state) => ({
  route: state.route
})

export default connect(mapStateToProps)(Router)
