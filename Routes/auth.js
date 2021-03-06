const Joi = require('joi');
const { User } = require('../Models/user'); 
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

// Login
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});

    if(!user) return res.send('Invalid email or password.');

    const validatePassword = await bcrypt.compare(req.body.password, user.password);

    if(!validatePassword) return res.send('Invalid email or password.');
    const token = user.generateAuthToken();
    res.send({"token": token});
});

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(req, schema);
}
module.exports = router;