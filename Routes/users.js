const {User, validate} = require('../Models/user'); 
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


//Register
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.send(error.details[0].message);
    
    let user = await User.findOne({ email: req.body.email});

    if(user) return res.status(200).send('User already registered.')

    user = new User(_.pick(req.body,['name', 'email', 'password']))
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send({token : token});
});

module.exports = router;
