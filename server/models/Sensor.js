const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const SensorSchema  = new Schema ({
    label : {
        type: String
    },
    sensorId : {
        type: String,
        required: true
    },
    user :{
        type: Schema.Types.ObjectId,
        ref : 'users'
    }
});

module.exports = Sensor = mongoose.model ('sensors' , SensorSchema);