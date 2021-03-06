/* eslint-disable import/no-anonymous-default-export */
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  USER_LOAD_FAILED,
  LOGOUT_USER,
  SET_LOADING,
  RESET_LOADING
} from "../actions/types";

const initialState = {
  user: null,
  loading: true,
  isAuthenticated: null,
  token: localStorage.getItem("jwtToken"),
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: payload.jwtToken,
      };
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
      };
    case SET_LOADING:
        return {
            ...state,
            loading : true
        }
    case RESET_LOADING:
        return {
            ...state,
            loading : false
        }
    case REGISTER_FAILED:
    case LOGIN_FAILED:
    case USER_LOAD_FAILED:
    case LOGOUT_USER:
      return {
        user: null,
        loading: false,
        isAuthenticated: null,
        token: null,
      };
    default:
      return state;
  }
};
