const User = require('../models/users.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.loginUser = async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email: email})
    if(!user) {
        return res.send({err:'Invalid Login'})
    }
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) {
        return res.send({err:'Invalid Login'})
    }
    const token = jwt.sign({
        id: user._id
    }, process.env.SECRET, {expiresIn: '120m'});
    res.json({
        user: {...user._doc, token: token}
    })
}

module.exports.registerUser = async (req,res) => {
    const {email,password,first_name,last_name} = req.body;
    const exists = await User.findOne({email: email});
    if (exists) {
        return res.send({err:'Email in use'})
    };
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt); 
    const body = {
        email: email,
        password: hash,
        first_name: first_name,
        last_name: last_name
    };
    User.create(body)
        .then((user) => {
            const token = jwt.sign({
                id: user._id
            }, process.env.SECRET, {expiresIn: '120m'});
            res.json({
                user: {...user._doc, token: token}
            })})
        .catch(err => res.json({err:err.errors}))
}

module.exports.verifyToken = async (req,res,next) => {
    const token = req.header('auth_token');
    if(!token) { 
        return res.json({err:'Access Denied'})
    }
    const x = token.split(' ')[1]
    try {
        const {id} = jwt.verify(token.split(' ')[1], process.env.SECRET);
        req.user = await User.findOne({_id: id}).select('_id');
        next();
    } catch (err) {
        res.json({err:'Access Denied'});
    }
}

//  636b1b5ee87289f0d360b12f
//  636af3dcac46d345e6de12ed