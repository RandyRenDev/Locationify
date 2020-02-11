const express = require('express');
const bodyParser = require('body-parser');

const places = require('./routes/places');
const users = require('./routes/users');
const HttpError = require('./models/http-error');

const app = express();

// automatically parses json into arrays/objects
app.use(bodyParser.json());

app.use('/api/places', places);
app.use('/api/users', users);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

// this middleware executes if any middleware above has an error
app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unkown error occured!'});
});

// starts server
app.listen(5000);