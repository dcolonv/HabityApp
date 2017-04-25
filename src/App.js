import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

import Router from './Router'

import reducers from './store'
import { getAllTasksId, getStoredObjectList, getLastTaskId, getLastDateUsed } from './helpers/storageHelper'
import { configureNotification, removeAllNotifications } from './helpers/notificationHelper'
import { setLastTaskId } from './utils'

export class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      store: null,
      loggedIn: null,
      user: null
    }
    configureNotification()
  }

  componentDidMount () {
    getAllTasksId().then((keys) => {
      Promise.all([getLastTaskId(), getLastDateUsed(), getStoredObjectList(keys)])
        .then((results) => {
          setLastTaskId(results[0])
          const tasks = results[2]
          const today = new Date()
          // new day reset all the tasks before setting the store
          if (results[1] && results[1].getDate() && results[1].getDate() < today.getDate()) {
            tasks.forEach((task) => {
              if (task.options && task.options.length) {
                task.options = task.options.map((option) => ({...option, done: false}))
              }
            })
          }
          const store = createStore(reducers, { tasks }, applyMiddleware(ReduxThunk))
          this.setState({ store })
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  componentWillUnmount () {
    removeAllNotifications()
    // TODO: Remove all the task from AsyncStorage
  }

  render () {
    const { store } = this.state
    if (store) {
      return (
        <Provider store={store}>
          <Router />
        </Provider>
      )
    }
    return null
  }
}

export default App
