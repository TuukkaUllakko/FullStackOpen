const notificationReducer = (state = 'Notification', action) => {
  switch(action.type) {
    case 'SET_MESSAGE':
      return action.notifiction
      default:
        return state
  }
}

export default notificationReducer