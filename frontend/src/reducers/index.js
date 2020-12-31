import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import files from './file';

export default combineReducers({ auth, alert, files });