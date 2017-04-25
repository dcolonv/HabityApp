import { saveTask, deleteTask } from '../../helpers/storageHelper'
import { addNotification, removeNotification } from '../../helpers/notificationHelper'

export const SET_TASKS = 'tasks/SET_TASKS'
export const setTasks = (tasks) => {
  return {
    type: SET_TASKS,
    payload: { tasks }
  }
}

export const UPDATE_TASK = 'tasks/UPDATE_TASK'
export const updateTask = (task) => {
  return (dispatch) => {
    removeNotification(task.id)
    addNotification(task.id, task.hour, task.minutes, task.title, task.options)

    // if options are undefined or empty fulfill them with generic task title message
    if (!task.options || !task.options.length) {
      task.options = [{description: task.title, done: false}]
    }

    saveTask(task)
      .then(() => {
        dispatch({
          type: UPDATE_TASK,
          payload: { task }
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export const REMOVE_TASK = 'tasks/REMOVE_TASK'
export const removeTask = (taskId) => {
  return (dispatch) => {
    removeNotification(taskId)
    deleteTask(taskId)
      .then(() => {
        dispatch({
          type: REMOVE_TASK,
          payload: { taskId }
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

export const toggleTaskOptionDone = (task, optionIndex) => {
  return (dispatch) => {
    const newTask = {...task}
    newTask.options[optionIndex].done = !newTask.options[optionIndex].done
    saveTask(newTask)
      .then(() => {
        dispatch({
          type: UPDATE_TASK,
          payload: { task: newTask }
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
