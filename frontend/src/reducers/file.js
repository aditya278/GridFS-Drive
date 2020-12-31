import { LOAD_FILES, REMOVE_FILES } from '../actions/types';

const initialState = null;

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case LOAD_FILES : 
            return payload;
        case REMOVE_FILES:
            return null;
        default :
            return state;
    }
};