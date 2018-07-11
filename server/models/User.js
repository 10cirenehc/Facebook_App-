
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
        //required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = User = mongoose.model('users', UserSchema);

/*
module.exports = User = mongoose.model('users', UserSchema) is the one responsible of registering the existence
of this model with the application context.
It is crucial for the correct functioning of the application.
mongoose.model('users', UserSchema) is the part that will be most important for us.
This part is mapping the UserSchema object we defined above with the 'users' label, this is vital if we are going to be
 creating relationships between our objects.
If this line is missing, the application will not know about this object and
will not be able to access, create or modify any instance of this object.
 */
