import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, severity) => (dispatch) => {
    dispatch({
        type : SET_ALERT,
        payload : { msg, severity }
    });
    setTimeout(() => {
        dispatch({
            type : REMOVE_ALERT        
        })
    }, 5000);
}
