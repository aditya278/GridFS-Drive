import axios from 'axios';
import { REGISTER_SUCCESS, USER_LOADED } from "./types";
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
        dispatch(loadUser);
    }
    catch(error) {
        const err = error.response.data;
        dispatch(setAlert(err.errors[0].msg));
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
        const err = error.response.data;
        dispatch(setAlert(err.errors[0].msg));
    }
}