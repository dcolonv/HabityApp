export const SET_SELECTED_HOUR = 'selectedHour/SET_SELECTED_HOUR'
export const setSelectedHour = (hour) => {
  return {
    type: SET_SELECTED_HOUR,
    payload: { hour }
  }
}
