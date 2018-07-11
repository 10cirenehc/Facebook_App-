const Validator = require('validator');
const isEmpty = require ('./is-empty');

module.exports = function validateSensorRegisterInput (data){
    let errors = {};

    data.sensorId = !isEmpty(data.sensorId) ? data.sensorId : '';
    data.label = !isEmpty(data.label) ? data.label : '';

    if (Validator.isEmpty(data.sensorId)){
        errors.sensorId = 'Sensor ID is required';
    }
    else if (!Validator.isLength(data.sensorId , { min: 1, max: 10})){
        errors.sensorId = 'Sensor ID cannot be more than  digits';
    }
    if (Validator.isEmpty(data.label)){
        errors.label = 'Label is required';
    }
    else if (!Validator.isLength(data.label , { min: 2, max: 30})){
        errors.label = 'Label cannot be more than 15 characters';
    }

    return{errors, isValid: isEmpty(errors)};
};