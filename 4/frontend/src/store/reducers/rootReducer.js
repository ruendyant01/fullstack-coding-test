import { combineReducers } from "redux";
import userReducer from "./userReducer";
import organizationReducer from './organizationReducer';

export const rootReducer = combineReducers({
    user:userReducer,
    organization:organizationReducer
})