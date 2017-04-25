import { AsyncStorage } from 'react-native'

export const storagePrefix = '@Habity'
export const taskPrefix = 'task'
export const lastTaskId = 'lastTaskId'
export const lastUsedDate = 'lastUsedDate'

export const getStoredObject = (key) => {
  return new Promise((resolve) => {
    AsyncStorage.getItem(key)
      .then((value) => {
        resolve(JSON.parse(value))
      })
  })
}

export const getStoredObjectList = (keys) => {
  return new Promise((resolve) => {
    AsyncStorage.multiGet(keys)
      .then((array) => {
        // cb([['k1', 'val1'], ['k2', 'val2']])
        array = array.map((value) => JSON.parse(value[1]))
        resolve(array)
      })
  })
}

export const saveTask = (task) => {
  saveLastDateUsed()
  return AsyncStorage.setItem(`${storagePrefix}:${taskPrefix}:${task.id}`, JSON.stringify(task))
}

export const deleteTask = (id) => {
  saveLastDateUsed()
  return AsyncStorage.removeItem(`${storagePrefix}:${taskPrefix}:${id}`)
}

export const getAllTasksId = () => {
  return new Promise((resolve) => {
    AsyncStorage.getAllKeys()
      .then((keys) => {
        if (keys && keys.length) {
          keys = keys.filter((key) => key.startsWith(`${storagePrefix}:${taskPrefix}`))
        }
        resolve(keys)
      })
  })
}

export const saveLastTaskId = (id) => {
  return AsyncStorage.setItem(`${storagePrefix}:${lastTaskId}`, id.toString())
}

export const getLastTaskId = () => {
  return new Promise((resolve) => {
    AsyncStorage.getItem(`${storagePrefix}:${lastTaskId}`)
      .then((value) => {
        if (value) {
          return resolve(parseInt(value))
        }
        return resolve(0)
      })
  })
}

export const saveLastDateUsed = (lastDate) => {
  const today = new Date()
  return AsyncStorage.setItem(`${storagePrefix}:${lastUsedDate}`, today.toString())
}

export const getLastDateUsed = () => {
  return new Promise((resolve) => {
    AsyncStorage.getItem(`${storagePrefix}:${lastUsedDate}`)
      .then((value) => {
        if (value) {
          return resolve(new Date(value))
        }
        return resolve(0)
      })
  })
}
