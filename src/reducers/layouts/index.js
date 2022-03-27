const initialState = {
  isHeaderOpen:false
}

/* finction reducer(currentState,action){

  } 
아래 const 문장과 같음*/ 
const layouts = (state = initialState, {
  type,
  payload
}) => {
  switch (type) {
    case '@layouts/UPDATE_HEADER_STATE':
      return {
        ...state ,
        isHeaderOpen: payload
      }
    default:
      return state
  }
}
export default layouts