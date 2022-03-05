const userModel = require('../models/userModel')
const bcrypt = require('bcrypt') 
const emailValidator = require('email-validator')
const jwt = require('jsonwebtoken');


// create JWT Token
const maxAge = 3 * 24 * 60 * 60;
const createJwtToken = async (id) => await jwt.sign({id}, 'Group7', {expiresIn: maxAge})

const logInFunc = async (req, res) => {
    
    /*
    if(req.method === 'GET') {

        let userInput={email:'',password:''};
        res.render('login',{errors:false,userInput});
    }
    if(req.method === 'POST'){*/
        
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
            // res.render('login', { errors, userInput:req.body });
            res.status(400).send(errors);
        }
        else {
                const user = await userModel.findOne( {email: req.body.email} );

                const token = await createJwtToken(user.id);
                
                const username = user.username;

                const userInfo = {username, token}
                
                console.log(userInfo);
                // res.cookie('jwtToken', token, {httpOnly: true, maxAge: maxAge * 1000})
                // res.redirect('/questions');
                // console.log(user);
                res.status(200).send(userInfo);
                // res.status(200).send(token);
        }
        
    /*}*/
}

const logOutFunc = (req, res) => {
    res.cookie('jwtToken', '', {maxAge: 1});
    res.clearCookie('jwtToken');
    res.redirect('/login');
}


const signUpFunc = async (req, res) => {
    /*
    if (req.method === 'GET'){
        let userInput={username: '', email: '', password: '',password2:''};
        res.render('signUp',{pageTitle: 'Sign up',userInput, errors:false});
    }
     
    if (req.method === 'POST'){*/

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
            //res.render('signUp', {errors,userInput: req.body, pageTitle:'Sign up'});
            res.status(400).send(errors);
        } else {
            const newUser = new userModel(req.body);
            newUser.save()
                .then(() => {
                    //res.redirect('login')
                    res.status(200).send('User was registered!');
                })
                .catch(err =>{
                    // console.log(err);
                    res.status(500).send(err);

                })
            
        }
    /*}*/
}

module.exports = {
    logInFunc,
    signUpFunc,
    //logOutFunc
}