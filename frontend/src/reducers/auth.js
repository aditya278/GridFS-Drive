/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    user : null,
    loading : true,
    isAuthenticated : null,
    token : localStorage.getItem('jwtToken')
};

export default (state=initialState, action) => {
    const {type, payload } = action;
    switch(type) {
        default : 
            return state;
    }
};