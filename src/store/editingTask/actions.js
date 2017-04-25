import { getLastTaskId } from '../../utils'

export const SET_EDITING_TASK = 'editingTask/SET_EDITING_TASK'
export const setEditingTask = (task) => {
  return {
    type: SET_EDITING_TASK,
    payload: { task }
  }
}

export const SET_NEW_EDITING_TASK = 'editingTask/SET_NEW_EDITING_TASK'
export const setNewEditingTask = (hour) => {
  return (dispatch) => {
    getLastTaskId()
      .then((id) => {
        dispatch({
          type: SET_NEW_EDITING_TASK,
          payload: { id, hour }
        })
      })
  }
}

export const REMOVE_EDITING_TASK = 'editingTask/REMOVE_EDITING_TASK'
export const removeEditingTask = () => {
  return {
    type: REMOVE_EDITING_TASK
  }
}
