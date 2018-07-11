import {GET_ERRORS, GET_LOGS} from "./types";
import axios from 'axios';

export const registerSensor = (sensorData , history) => dispatch => {
    axios.post('/api/sensors/register' , sensorData)
        .then(res => {
            console.log(res);
            history.push('/dashboard');
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: GET_ERRORS, payload: err.response.data });
        });
};

export const getLogs = () => dispatch => {

    axios.get('/api/sensors/all/')
        .then(res => {
            dispatch({
                type: GET_LOGS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_LOGS,
                payload: null
            });
        });
};
