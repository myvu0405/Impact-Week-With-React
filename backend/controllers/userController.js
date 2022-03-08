const userModel = require('../models/userModel')
const bcrypt = require('bcrypt') 
const emailValidator = require('email-validator')
const jwt = require('jsonwebtoken');


// create JWT Token
const maxAge = 3 * 24 * 60 * 60;
const createJwtToken = async (id,username,email) => await jwt.sign({id,username,email}, 'Group7', {expiresIn: maxAge})//MV: added username and email to sign the toke

const logInFunc = async (req, res) => {
    
    const {email, password} = req.body;
    let errors = {email:'',password:''};

    if (email=='') errors.email= "Please input your email address.";
    if (password=='') errors.password= "Please input your password.";
    if(email && !emailValidator.validate(email) ){
        errors.email= 'Email is invalid';
    }
    if (email && emailValidator.validate(email)) {
        const user = await userModel.findOne( {email: req.body.email} );
        if(!user){
            errors.email= "User doesn't exist yet. Register first please!";
            
        } else {
            const matchedPassword = await bcrypt.compare(req.body.password, user.password)
            if( !matchedPassword ){
                errors.password= "Password is not correct";
            }
        }
    }

    if(errors.email|| errors.password) {
        res.status(400).send(errors);
    }
    else {
            const user = await userModel.findOne( {email: req.body.email} );

            const token = await createJwtToken(user.id,user.username,user.email);//MV added username and email to sign the toke
            
            res.status(200).send(token);
    }
    
}

const logOutFunc = (req, res) => {
    res.cookie('jwtToken', '', {maxAge: 1});
    res.clearCookie('jwtToken');
    res.redirect('/login');
}


const signUpFunc = async (req, res) => {

    let errors = {username: '', email: '', password: '',password2:''};
    const {username, email, password, password2} = req.body;
    if (username == '') errors.username ='Please input your username';
    if (email == '') errors.email ='Please input your email';
    if (password == '') errors.password ='Please input your password';
    
    if (username && username.length < 3){
        errors.username= 'Username should be more than 3 characters ';
    }
    if (password && password.length < 5){
        errors.password= 'Password should be more than 5 characters ';
    }
    //check passwords match
    if (password !== password2) {
        errors.password2= 'Passwords do not match';
    }
    if(email && !emailValidator.validate(email) ){
        errors.email= 'Email is invalid';
    }
    // check duplicate email
    const currentUser = await userModel.findOne({email: req.body.email});

    if(currentUser){
        errors.email= 'email address is already exist';
        
    }
    if (errors.username || errors.email|| errors.password||errors.password2) {
        res.status(400).send(errors);
    } else {
        const newUser = new userModel(req.body);
        newUser.save()
            .then(() => {
                res.status(200).send('User was registered!');
            })
            .catch(err =>{
                res.status(500).send(err);

            })
        
    }
}

module.exports = {
    logInFunc,
    signUpFunc,
    //logOutFunc
}