import { createOrg, loadingState, loginState, userOrgs } from "../actions/actionType";

const initialState = {
    isLoading:false,
    isLogin:false,
    userOrgs:[]
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case loadingState:
        return {
            ...state,
            isLoading:payload
        }
    case loginState:
        return {
            ...state, 
            isLogin:payload
        }
    case userOrgs:
        return {
            ...state,
            userOrgs:payload
        }
    case createOrg:
        return {
            ...state,
            userOrgs:[...state.userOrgs, payload]
        }
    default:
        return state;
  }
}
