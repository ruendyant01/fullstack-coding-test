import MySwal from "../../utils/swal";
import { allOrganization, createOrg, loadingState, loginState, userOrgs } from "./actionType";

const baseURL = "http://localhost:3001"


export const loadingAction = (payload) => {
    return {
        type: loadingState,
        payload
    }
}

export const loginAction = (payload) => {
    return {
        type: loginState,
        payload
    }
}

export const setAllOrgs = (payload) => {
    return {
        type: allOrganization,
        payload
    }
}

export const setUserOrgs = (payload) => {
    return {
        type: userOrgs,
        payload
    }
}

export const addNewUserOrg = (payload) => {
    return {
        type: createOrg,
        payload
    }
}

export function registerNewUser(data) {
    const dataString = JSON.stringify(data);
    return (disp) => {
        disp(loadingAction(true));
        return fetch(baseURL+"/register", {
            method: "POST",
            body: dataString,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

export function loginUser(data) {
    const dataString = JSON.stringify(data);
    return (disp) => {
        disp(loadingAction(true));
        return fetch(baseURL+"/login", {
            method:"POST",
            body:dataString,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

export function fetchAllOrgs() {
    return (disp) => {
        disp(loadingAction(true));
        fetch(baseURL+"/")
        .then(res => res.json())
        .then(data => {
            disp(setAllOrgs(data))
        })
        .catch(err => MySwal.fire({
            title: err.message,
            icon:"error"
        }))
        .finally(() => disp(loadingAction(false)));
    }
}

export function fetchUserOrgs(data) {
    return (disp) => {
        disp(loadingAction(true));
        fetch(baseURL+'/organization', {
            headers: {
                "access_token":data
            }
        })
        .then(res => res.json())
        .then(data => {
            disp(setUserOrgs(data))
        })
        .catch(err => MySwal.fire({
            title: err.message,
            icon:"error"
        }))
        .finally(() => disp(loadingAction(false)))
    }
}

export function createOrgAction(data) {
    const parsedStruct = JSON.stringify(data.structure);
    const dataString = JSON.stringify({...data, structure:parsedStruct});
    const access_token = localStorage.access_token;
    return (disp) => {
        disp(loadingAction(true));
        return fetch(baseURL+"/organization/create", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                access_token
            },
            body: dataString
        })
    }
}