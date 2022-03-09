const jwt = require('jsonwebtoken') ;
const User = require('../models/userModel');
const {Question} = require('../models/questionModel');//MYVU added


const checkUser = async (req, res, next) => {
    
    const token = req.cookies.jwtToken;
    
    if(token){
        try {
            const authUser = await jwt.verify(token, 'Group7');
            
            User.findById(authUser.id)
                .then(user => {
                    
                    const {username, email, createdAt, updatedAt, id} = user;
                    res.locals.user = {username, email, createdAt, updatedAt, id};
                    
                    next();
                })
                .catch(err => {
                    res.locals.user = null;
                    next();
                })
        } catch (error) {
            res.locals.user = null;
            next();
        }
    }
    else {
        res.locals.user = null
        next();
    }
    
}

const isLoggedIn = async (req, res, next) => {
    const token = req.cookies.jwtToken;
    if(token) {
        const decodedToken = await jwt.verify(token, 'Group7');
        if(decodedToken) {
        next()
        } else {
            res.redirect('/login');
        }   
    } else {
        res.redirect('/login');
    }
}

//ADDED by MYVU: check if user has right to edit/delete before accessing the function

const checkPermission = async (user,objectType, object,action='') =>{

    if (objectType=='question') {
        if (user.id==object.user_id.id) {
            
            return true;
        }
        return false;
    }
    else if (objectType == 'answer') {
        if (action!= 'delete') {
            if (user.id==object.user_id.id) return true;
            else return false;
        }
        else {
            const question = object.question_id;
            // const userInDb = await User.findById(user.id);
            // console.log(user.id, object.question_id.user_id._id.toString());
            if (user.id== object.question_id.user_id._id.toString() || user.id==object.user_id.id) return true;
            else return false;
        }
    }
}
//----------------------------------------------------------------------------------

//MV: new function to check authorization with JWT sent along with request
const protectedRoute = async(req,res,next) => {

    let token ;
    //check Header of the object Authorization from http request
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from headers
            token = req.headers.authorization.split(' ')[1];
            //verify the token
            const decoded = jwt.verify(token,'Group7');
            //get the user from the token payload
            req.user= await User.findById(decoded.id).select('-password');

            next();

        } catch (error) {
            console.log(error);
            res.status(401).send('Not authorized!');
            // throw new Error('Not authorized!');
        }
    }

    if(!token){
        res.status(401).send('Not authorized, no token!');
        // throw new Error('Not authorized, no token!');
    }

}

module.exports = { checkUser, isLoggedIn,checkPermission,protectedRoute}