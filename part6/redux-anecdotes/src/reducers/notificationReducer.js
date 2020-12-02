const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIF':
      return action.data
    case 'HIDE_NOTIF':
      return ''
    default:
      return state
  }
}

export const showNotif = (notification, time) => {
  return async dispatch => {
    await dispatch({
      type: 'SHOW_NOTIF',
      data: notification
    })

    setTimeout(() => {
      dispatch(hideNotif())
    }, 1000 * time)
  }
}

export const hideNotif = () => {
  return {
    type: 'HIDE_NOTIF'
  }
}

  export default notificationReducer