const mongoose = require('mongoose');
const Job = require('./jobs.model');
const bcrypt = require('bcryptjs');

const UsersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'First Name Required']
    },
    last_name: {
        type: String,
        required: [true, 'Last Name Required']
    },
    email: {
        type: String,
        required: [true, 'Email Required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password Required']
    }
},{timestamps:true});

const User = mongoose.model('Users', UsersSchema);
module.exports = User