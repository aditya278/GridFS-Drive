/* eslint-disable import/no-anonymous-default-export */
import { REGISTER_SUCCESS, USER_LOADED, REGISTER_FAILED, LOGIN_SUCCESS, LOGIN_FAILED } from '../actions/types';

const initialState = {
    user : null,
    loading : false,
    isAuthenticated : null,
    token : localStorage.getItem('jwtToken')
};

export default (state=initialState, action) => {
    const {type, payload } = action;
    switch(type) {
        case REGISTER_SUCCESS :
        case LOGIN_SUCCESS :
            return {
                ...state,
                isAuthenticated : true,
                loading : false,
                token : payload.jwtToken
            }
        case USER_LOADED : 
            return {
                ...state,
                user : payload
            }
        case REGISTER_FAILED:
        case LOGIN_FAILED:
            return {
                user : null,
                loading : false,
                isAuthenticated : null,
                token : null
            }
        default : 
            return state;
    }
};