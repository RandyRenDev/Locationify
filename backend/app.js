const express = require('express');
const bodyParser = require('body-parser');

const places = require('./routes/places');

const app = express();

app.use(places);


// starts server
app.listen(5000);