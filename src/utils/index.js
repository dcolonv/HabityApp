import { saveLastTaskId } from '../helpers/storageHelper'

// Helpers for the app
let lastTaskId = 0

export const setLastTaskId = (id) => {
  lastTaskId = id
}

export const getLastTaskId = () => {
  lastTaskId++
  return new Promise((resolve) => {
    saveLastTaskId(lastTaskId)
      .then(() => resolve(lastTaskId))
  })
}

export const getTextHour = (hour) => {
  if (hour === 0) {
    return '12 am'
  }
  if (hour === 12) {
    return '12 pm'
  }
  return hour > 12 ? `${hour - 12} pm` : `${hour} am`
}

export const getTextHourMinutes = (hour, minutes = 0) => {
  minutes = `0${minutes}`.slice(-2)
  if (hour === 0) {
    return `12:${minutes} am`
  }
  if (hour === 12) {
    return `12:${minutes} pm`
  }
  return hour > 12 ? `${hour - 12}:${minutes} pm` : `${hour}:${minutes} am`
}
