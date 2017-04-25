import * as actions from './actions'

const INITIAL_STATE = []

export default (state = INITIAL_STATE, {type, payload}) => {
  let taskIndex
  switch (type) {
    case actions.SET_TASKS:
      return payload.tasks
    case actions.UPDATE_TASK:
      taskIndex = state.findIndex((task) => (task.id === payload.task.id))
      if (taskIndex >= 0) {
        return [
          ...state.slice(0, taskIndex),
          payload.task,
          ...state.slice(taskIndex + 1)
        ]
      }
      // if not in array, added as new
      return [...state, payload.task]
    case actions.REMOVE_TASK:
      taskIndex = state.findIndex((task) => (task.id === payload.taskId))
      if (taskIndex >= 0) {
        return [
          ...state.slice(0, taskIndex),
          ...state.slice(taskIndex + 1)
        ]
      }
      return state
    default:
      return state
  }
}
