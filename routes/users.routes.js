const UserController = require('../controllers/users.controllers')

module.exports = (app) => {
    app.post('/api/login', UserController.loginUser);
    app.post('/api/register', UserController.registerUser);
}