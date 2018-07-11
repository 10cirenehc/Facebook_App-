const express = require('express');
const router = express.Router();

const Sensor = require('../../models/Sensor');

const User  = require('../../models/User');

const Log = require('../../models/Log');

const passport = require('passport');

const jwt =  require('jsonwebtoken');

const validateSensorRegisterInput = require('../../validation/sensorRegister');

router.get('/test', (req,res) => res.json({msg: "Sensors Works!"}));

router.get ('/:id', (req, res) => {
    Sensor.findOne({sensorId: req.params.id})
        .then(sensor => {
            if(!sensor){
                return res.status(404).json({msg: 'Sensor not registered'})
            }
            else{
                const newLog = new Log ({
                    sensorId: sensor.sensorId,
                    label: sensor.label,
                    time : Date.now(),
                    user: sensor.user
                });

                newLog.save()
                    .then(log => res.json(log));
            }
        })
        .catch(err => res.status(404).json(err));
});

router.post ('/register' , passport.authenticate('jwt', {session: false}) , (req,res) => {
    const {errors, isValid} = validateSensorRegisterInput (req.body);
    if (!isValid){
        return res.status(400).json(errors);
    }
    Sensor.findOne ({ sensorId: req.body.sensorId})
        .then (sensor => {
            if (sensor){
                errors.sensorId = "Sensor already registered";
                return res.status(400).json(errors);
            } else{
                const newSensor = new Sensor({
                    sensorId : req.body.sensorId,
                    label: req.body.label,
                    user: req.user.id
                });
                newSensor.save()
                    .then(sensor => {
                        return res.json(sensor);
                    });
            }

        });

});

router.get('/all' , passport.authenticate('jwt', {session: false}), (req,res) => {
    Log.find({user: req.params.id})
        .then(log =>{
            if(!log){
                res.status(404).json('No logs found')
            }
            else{
                Log.find().sort({Date: -1})
                    .then(res.json(log))
                    .catch(err => res.status(400).json(err))
            }
        })
        .catch(err=> res.status(400).json(err));
});



module.exports = router;