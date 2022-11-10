const Job = require('../models/jobs.model');

module.exports.allJobs = (req,res) => {
    const user_id = req.user._id.toHexString();
    Job.find({applicant: user_id})
        .then(allJobs => {res.json({jobs: allJobs})})
        .catch(err => res.json({err: 'Error Getting Applications'}))
}

module.exports.oneJob = (req,res) => {
    const user_id = req.user._id.toHexString();
    Job.findOne({_id: req.params.id, applicant: user_id})
        .then(oneJob => {res.json({job: oneJob})})
}

module.exports.newJob = (req,res) => {
    const user_id = req.user._id.toHexString();
    const body = {...req.body, applicant: user_id};
    Job.create(body)
        .then(newJob =>res.json({ job: newJob }))
        .catch(err =>res.json({err: err.errors}))
}

module.exports.updateJob = (req,res) => {
    const user_id = req.user._id.toHexString();
    Job.findOneAndUpdate({ _id: req.params.id, applicant: user_id}, req.body, {new:true})
        .then(updatedJob => res.json({job: updatedJob}))
        .catch(err => res.json({err: err}))
}

module.exports.deleteJob = (req,res) => {
    const user_id = req.user._id.toHexString();
    Job.deleteOne({_id: req.params.id, applicant: user_id})
        .then(result => res.json({result:result}))
        .catch(err => res.json({err: err}))
}