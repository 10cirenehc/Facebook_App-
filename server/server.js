
const path = require('path');

//import the express server
const express = require('express');

//a library to deal with mongoDB
const mongoose = require('mongoose');

//parse the url request
const bodyParser = require('body-parser');

// include for jwt
const passport = require('passport');

//Add the files that contain the routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const sensors = require ('./routes/api/sensors');

//actual creation of the server
const app = express();

// Body parser middleware(things that you add to the web server that will modify its behavior)
//Body parser tells express to transform requested objects into JSON labels 'body'.
app.use (bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//db config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


//Passport middleware
app.use (passport.initialize());
//Passport config
require ('./config/passport')(passport);


//This configures the webb server root path
app.get('/', (req, res) => res.send('Hello!'));

//use routes
app.use('/api/users',users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/sensors', sensors);

// server static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    // Redirect to build folder
    app.get('*',(req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

// To display values of variables to display we use back ticks (ES6)
app.listen(port, () => console.log(`Server running on port ${port}`));