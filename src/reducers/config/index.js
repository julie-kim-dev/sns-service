const initialState = {
  identification: {
    version: '0.0.1'
  },
  service: { // 닉네임이 들어갈 자리를 만들어 놓는다
    nicknames: []
  }
}
const config = (state = initialState, {
  type,
  payload
}) => {
  switch (type) {
    case '@config/UPDATE_NICKNAMES':
      return {
        ...state,
        service:{
          nicknames: payload
        }
      }
    default:
      return state
  }
}
export default config