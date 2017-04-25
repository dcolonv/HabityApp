import { combineReducers } from 'redux'

import auth from './auth/reducer'
import selectedHour from './selectedHour/reducer'
import tasks from './tasks/reducer'
import editingTask from './editingTask/reducer'
import route from './route/reducer'

export default combineReducers({
  auth,
  selectedHour,
  tasks,
  editingTask,
  route
})
