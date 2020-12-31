import axios from 'axios';

const setAuthToken = (token) => {
    if(token) {
        localStorage.setItem("jwtToken", token);
        axios.defaults.headers.common["auth-token"] = token;
    }
    else {
        delete axios.defaults.headers.common['auth-token'];
        localStorage.removeItem("jwtToken");
    }
}

export default setAuthToken;