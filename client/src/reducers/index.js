import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import sensorReducer from "./sensorReducer";

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
    errors: errorReducer,
    sensor: sensorReducer,
});

