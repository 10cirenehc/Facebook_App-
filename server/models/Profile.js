const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle : {
        type: String,
        required: true,
        max: 40,
    },
    Location : {
        type: String,
    },
    Bio: {
        type: String,
    },
    githubbusername : {
        type: String,
    },
    social: {
        youtube :{
            type: String,
        },
        twitter : {
            type: String,
        },
        facebook :{
            type: String,
        },
        linkedin :{
            type: String,
        },
        instagram :{
            type: String,
        },

    },

    date: {
        type: Date,
        default : Date.now(),
    }

});

module.exports = Profile = mongoose.model('profile',ProfileSchema);