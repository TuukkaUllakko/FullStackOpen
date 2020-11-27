const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)

  let copiedState = { ...state }

  switch (action.type) {
    case 'GOOD':
      copiedState.good++
      return copiedState
    case 'OK':
      copiedState.ok++
      return copiedState
    case 'BAD':
      copiedState.bad++
      return copiedState
    case 'ZERO':
      return initialState
    default: return initialState
  }

}

export default counterReducer