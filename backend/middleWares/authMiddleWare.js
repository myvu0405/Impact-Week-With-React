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
            const userInDb = await User.findById(user.id);
            
            if (userInDb== question.user_id || user.id==object.user_id.id) return true;
            else return false;
        }
    }
}
//----------------------------------------------------------------------------------

module.exports = { checkUser, isLoggedIn,checkPermission}