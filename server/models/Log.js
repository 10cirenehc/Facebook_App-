const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const LogSchema = new Schema ({
    sensorId : {
        type: String,
        required: true
    },
    label :{
        type: String
    },
    time: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = Log  = mongoose.model('log', LogSchema);