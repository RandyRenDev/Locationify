const uuid = require('uuid');

const HttpError = require('../models/http-error');

const validator = require('express-validator');
const validationResult = validator.validationResult;

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Randy',
        email: 'randy@randy.com',
        password: 'password'
    }
];


const getUsers = (req, res, next) =>{

     res.status(200).json({users: DUMMY_USERS});
};

const signup = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Information provided is not accurate. Please retry', 422);
    }
    const {name, email, password} = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);
    
    if(hasUser){
        throw new HttpError('Could not create user, email already exists.', 422);
    }

    const createUser = {
        id: uuid(),
        name: name,
        email: email,
        password: password
    };

    DUMMY_USERS.push(createUser);

    res.status(201).json({user:createUser});

};

const login = (req, res, next) => {
    const { email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email === email);

    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError('Could not identify user, credentials are wrong');
    }

    res.json( {message: 'Logged in'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;