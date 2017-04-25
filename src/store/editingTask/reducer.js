import * as actions from './actions'

const INITIAL_STATE = null

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case actions.SET_EDITING_TASK:
      return payload.task
    case actions.SET_NEW_EDITING_TASK:
      return {
        isNew: true,
        id: payload.id,
        hour: payload.hour,
        minutes: 0,
        options: [{
          description: '',
          done: false
        }],
        completed: false
      }
    case actions.REMOVE_EDITING_TASK:
      return INITIAL_STATE
    default:
      return state
  }
}
