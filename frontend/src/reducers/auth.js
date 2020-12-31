/* eslint-disable import/no-anonymous-default-export */
import { REGISTER_SUCCESS, USER_LOADED } from '../actions/types';

const initialState = {
    user : null,
    loading : true,
    isAuthenticated : null,
    token : localStorage.getItem('jwtToken')
};

export default (state=initialState, action) => {
    const {type, payload } = action;
    switch(type) {
        case REGISTER_SUCCESS : 
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
        default : 
            return state;
    }
};