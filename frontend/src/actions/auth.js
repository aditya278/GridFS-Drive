import axios from 'axios';
import { REGISTER_SUCCESS, USER_LOADED, REGISTER_FAILED, LOGIN_SUCCESS, LOGIN_FAILED, USER_LOAD_FAILED } from "./types";
import { setAlert } from './alert';

import setAuthToken from '../utils/setAuthToken';

export const register = (formData) => async(dispatch) => {
    try {
        const res = await axios.post("/api/user/register", formData);
        dispatch({
            type : REGISTER_SUCCESS,
            payload : res.data
        });
        setAuthToken(res.data.jwtToken);
        dispatch(loadUser());
    }
    catch(error) {
        const err = error.response.data;
        dispatch(setAlert(err.errors[0].msg, "error"));
        dispatch({
            type : REGISTER_FAILED
        });
        setAuthToken();
    }
}

export const loadUser = () => async(dispatch) => {
    try {
        const res = await axios.get("/api/user");
        dispatch({
            type : USER_LOADED,
            payload : res.data
        })
    }
    catch(error) {
        dispatch(setAlert());
        dispatch({
            type : USER_LOAD_FAILED
        })
        setAuthToken();
    }
}

export const login = (formData) => async(dispatch) => {
    try {
        const res = await axios.post("/api/user/login", formData);
        dispatch({
            type : LOGIN_SUCCESS,
            payload : res.data.jwtToken
        });
        setAuthToken(res.data.jwtToken);
        dispatch(loadUser());
    }
    catch(error) {
        const err = error.response.data;
        dispatch(setAlert(err.errors[0].msg, "error"));
        dispatch({
            type : LOGIN_FAILED
        });
        setAuthToken();
    }
}