import { LOAD_FILES , REMOVE_FILES } from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const getAllFiles = () => async(dispatch) => {
    try {
        const res = await axios.get('/api/file/all');
        dispatch({
            type : LOAD_FILES,
            payload : res.data
        });
    }
    catch(error) {
        const err = error.response.data;
        dispatch(setAlert(err.errors[0].msg, "error"));
        dispatch({
            type : REMOVE_FILES
        })
    }
}

export const getSharedFile = (fileId) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/file/${fileId}`);
        dispatch({
            type : LOAD_FILES,
            payload : res.data
        });
    }
    catch(error) {
        const err = error.response.data;
        dispatch(setAlert(err.errors[0].msg, "error"));
        dispatch({
            type : REMOVE_FILES
        })
    }
}

export const deleteFile = (fileId) => async(dispatch) => {
    try {
        const formData = { fileId };
        const res = await axios.post(`/api/file/delete`, formData);
        dispatch({
            type : LOAD_FILES,
            payload : res.data
        });
    }
    catch(error) {
        const err = error.response.data;
        dispatch(setAlert(err.errors[0].msg, "error"));
        dispatch({
            type : REMOVE_FILES
        })
    }
}

export const downloadFile = (id, filename) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/file/download/${id}`, {responseType : "blob"});
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
    }
    catch(error) {
        const err = error.response.data;
        dispatch(setAlert(err.errors[0].msg, "error"));
        dispatch({
            type : REMOVE_FILES
        })
    }
}

export const downloadSharedFile = (id, filename) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/file/download/shared/${id}`, {responseType : "blob"});
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
    }
    catch(error) {
        const err = error.response.data;
        dispatch(setAlert(err.errors[0].msg, "error"));
        dispatch({
            type : REMOVE_FILES
        })
    }
}