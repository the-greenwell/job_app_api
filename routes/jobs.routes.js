const JobController = require('../controllers/jobs.controllers');
const UserController = require('../controllers/users.controllers')

module.exports = (app) => {
    app.post('/api/jobs/', UserController.verifyToken, JobController.newJob);
    app.get('/api/jobs/', UserController.verifyToken, JobController.allJobs);
    app.get('/api/jobs/:id', UserController.verifyToken, JobController.oneJob);
    app.put('/api/jobs/:id', UserController.verifyToken, JobController.updateJob);
    app.delete('/api/jobs/:id', UserController.verifyToken, JobController.deleteJob);
}