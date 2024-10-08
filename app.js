const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const createDefaultUser = require('./utils/');

require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(createDefaultUser())

app.use('/api/users', require('./routes/users'));
app.use('/api/orders', require('./routes/orders'));

module.exports = app;
