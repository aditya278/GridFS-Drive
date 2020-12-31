import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg) => (dispatch) => {
    dispatch({
        type : SET_ALERT,
        payload : { msg }
    });
    setTimeout(() => {
        dispatch({
            type : REMOVE_ALERT        
        })
    }, 5000);
}
