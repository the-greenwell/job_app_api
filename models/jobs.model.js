const mongoose = require('mongoose');

const JobsSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company Required']
    },
    position: {
        type: String,
        required: [true, 'Job Position Required']
    },
    status: {
        type: String,
        required: [true, 'Application Status Required']
    },
    link: {type: String},
    applicant: {
        type: String,
        required: true
    },
    notes: {type: String},
    starred: {
        type: Boolean, default: false
    },
},{timestamps:true});

const Job = mongoose.model('Jobs', JobsSchema);
module.exports = Job