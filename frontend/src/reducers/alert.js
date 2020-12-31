import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = null;

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case SET_ALERT : 
            return payload;
        case REMOVE_ALERT:
            return null;
        default :
            return state;
    }
};