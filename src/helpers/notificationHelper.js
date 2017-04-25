import { Platform } from 'react-native'
import PushNotification from 'react-native-push-notification'
export const notificationPrefix = '@Habity'

export const configureNotification = () => {
  PushNotification.configure({
    popInitialNotification: false,
    onNotification: (notification) => {
      console.log('Notification:', notification)
    }
  })
}

export const addNotification = (id, hour, minutes, message, options) => {
  const scheduleDate = new Date()
  // if hour is in the past, set new day for alert
  if (hour < scheduleDate.getHours() || (hour === scheduleDate.getHours() && minutes <= scheduleDate.getMinutes())) {
    scheduleDate.setDate(scheduleDate.getDate() + 1)
  }
  scheduleDate.setHours(hour, minutes, 0)
  // if ios title is the main message, if android are options
  const optionsMessage = options && options.length ? options.map((option) => option.description).join(' - ') : message
  const mainMessage = Platform.OS === 'ios' ? message : optionsMessage
  PushNotification.localNotificationSchedule({
    id,
    title: message || 'Task reminder',
    message: mainMessage, // (required)
    date: scheduleDate,
    repeatType: 'day',
    largeIcon: 'app_launcher',
    smallIcon: 'app_laucher'
  })
}

export const removeNotification = (id) => {
  PushNotification.cancelLocalNotifications({ id })
}

export const removeAllNotifications = () => {
  PushNotification.cancelAllLocalNotifications()
}
