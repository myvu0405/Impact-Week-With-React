const {Question} = require('../models/questionModel')
const User = require('../models/userModel')
const Answer = require('../models/answerModel'); 
const {handlerError} = require('../config/handlerErrors');

const {checkPermission} = require ('../middleWares/authMiddleWare');

const mongoose = require('mongoose');

const addQuestion = async (req,res) => {
    if (req.method === 'GET') {
        let newQuestion={question:'',description:''};
        res.render('addQuestion', {newQuestion,errors: null, pageTitle: 'Add question'}); 
    }
    if (req.method === 'POST') {
            const id = res.locals.user.id;
            const user = await User.findById(id);
            let newQuestion = new Question(req.body);
            newQuestion.user_id = user;
            
            newQuestion.save()
                .then( () => {
                    
                    res.redirect('/questions');
                })
                .catch( err => 
                {
                    const errors = handlerError(err);
                    
                    res.render('addQuestion', {newQuestion:req.body,errors, pageTitle: 'Add question'}); 
                })
    } 
}

//Function to show question detail along with its answers

const showOneQuestion = async (req, res) => {

    //Looking if the question exists in the db...
    try {
        const result= await Question.findById(mongoose.Types.ObjectId(req.params.id)).populate('user_id');
        if(result) {
                
                //Find all answers belong to the selected question
                Answer.find({question_id:result}).populate('question_id').populate('user_id').sort({updatedAt: -1})
                    .then(answers => {
                        res.render('showOneQuestion', {result, answers,errors:null,pageTitle: 'Question detail'});
                    })                
                    .catch(err => res.render('error',{error:'Oop... record your want to find does not exist!'})) 
        }
                
        else res.render('error',{error:'Oop... record your want to find does not exist!'})}  
    catch(err) {
        res.render('error',{error:'Oop... record your want to find does not exist!'});
    }      
            
}

//Delete one question

const delQuestion = async (req, res) => {

    //Checking if the question exists in the db...
    try {
        const question= await Question.findById(mongoose.Types.ObjectId(req.params.id)).populate('user_id');
        if (question) { //If question exists

            const check= await checkPermission(res.locals.user, 'question', question);
            if (!check) {//If user does not have right to delete
                
                res.render('error',{error:'You do not have permission to delete this question!'});
            }
            else {
                //=============================================
                    Question.findByIdAndDelete(req.params.id)
                        .then( () => {
                            
                            //find all answers belong to the question and delete them
                            Answer.deleteMany({question_id: mongoose.Types.ObjectId(req.params.id)})
                                .then(() => {
                                    res.redirect('/questions');
                                })
                                .catch(err => console.log(err))
                            
                        })
                        .catch( err => console.log(err)) 
                }
        }
        else res.render('error',{error : 'Oop... record your want to find does not exist!'});
    }
    catch(error) {
        res.render('error',{error : 'Oop... record your want to find does not exist!'});
    }
}

//Edit one question function:

const editQuestion = async (req, res) => {

    //Looking for the question in db    
    try {
        const result = await Question.findById(mongoose.Types.ObjectId(req.params.id)).populate('user_id');

        if(result) { //check if the question exists

            if(req.method === 'GET'){
                //Checking user's permission
                const check=await checkPermission(res.locals.user, 'question', result);
                
                if (!check) {
                    
                    res.render('error', {error: 'You do not have permission to edit this question!'});
                }

                else {
                        res.render('editQuestion', { result, errors: false, pageTitle: 'Edit question'})
                        
                } 
            }
            if (req.method ==='POST'){

                //Checking user's permission

                const check=await checkPermission(res.locals.user, 'question', result);
                if (!check) {
                    
                    res.render('error', {error: 'You do not have permission to edit this question!'});
                }
                else {
                
                        result.question = req.body.question;
                        result.description = req.body.description;
                        result.save() 
                        .then((result) => {
                            res.redirect(`/showOneQuestion/${req.params.id}`); 
                        }) 
                        .catch(err => {
                            const errors = handlerError(err);
                            res.render('editQuestion', {errors, result, pageTitle: 'Edit question'});
                        })
                }
                    
            }
    
        }
        //if cannot find the question in db
        else res.render('error', {error: 'Oop... record your want to find does not exist!'}) 
    }
    catch(error ){
        res.render('error', {error: 'Oop... record your want to find does not exist!'})
    }

}

module.exports = {
    addQuestion,
    showOneQuestion,
    delQuestion,
    editQuestion}