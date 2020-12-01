const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SNOW_NOTIF':
      return action.data
    case 'HIDE_NOTIF':
      return ''
    default:
      return state
  }
}

export const showNotif = (notification) => {
  return {
    type: 'SNOW_NOTIF',
    data: notification
  }
}

export const hideNotif = () => {
  return {
    type: 'HIDE_NOTIF'
  }
}

  export default notificationReducer