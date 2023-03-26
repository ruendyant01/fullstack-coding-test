import { allOrganization, createOrg } from "../actions/actionType";

const initialState = {
    organizations:[]
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case allOrganization:
        return {
            ...state, 
            organizations:payload
        }
    default:
        return state;
  }
}
