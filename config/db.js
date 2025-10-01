require('dotenv').config();
const mongose = require('mongoose');
const dbString = process.env.DB_STRING;

mongose.connect(dbString)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err.message));

module.exports = mongose;

