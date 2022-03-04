const mongoose = require('mongoose');
const {Question} = require('../models/questionModel');
const Answer = require('../models/answerModel');
const User = require('../models/userModel');

const {handlerError} = require('../config/handlerErrors');

const {checkPermission}= require('../middleWares/authMiddleWare');//My VU updated

//Add an answer to a question:

const addAnswer = async (req,res) => {
    //getting data from request
    const {answer, question_id, user_id} = req.body;
    const question = await Question.findById(question_id);
    const user=await User.findById(user_id);
    //create new answer
    const newAnswer=new Answer({description: answer, user_id: user, question_id: question});
    newAnswer.save()
        .then(() => {
            res.redirect(`/showOneQuestion/${question_id}`);
        })
        .catch(err => {
            const errors =handlerError(err);
            Answer.find({question_id:question}).populate('question_id').populate('user_id').sort({updatedAt: -1})
                .then(answers => {
                    res.render('showOneQuestion', {result:question,answers,errors,pageTitle:'Question detail'})
                })
                .catch(err => console.log(err))
        }) 
}

//Edit an answer:
const editAnswer = async (req,res) => {

    //Looking for the target answer:
    try {    
        
        const answer = await Answer.findById(mongoose.Types.ObjectId(req.params.id)).populate('question_id').populate('user_id');

        if (!answer) {//IF answer not found
            res.render('error', {error: 'Oop... record your want to find does not exist!'});
        }
        else {

            if(req.method=='GET') {

                //Checking user permission:
                const check=await checkPermission(res.locals.user, 'answer', answer);
                if (!check) {
                    
                    res.render('error',{error:'You do not have right to edit this answer!'});
                }
                else {
                        res.render('editAnswer', {answer, question:answer.question_id, errors:null, pageTitle:'Edit an answer'});
                }
                    
            }
            else if (req.method=='POST') {

                //check user permission
                const check=await checkPermission(res.locals.user, 'answer', answer);
                if (!check) {
                    
                    res.render('error',{error:'You do not have right to edit this answer!'});

                }
                else {
                
                        answer.description=req.body.description;
                        answer.save()
                            .then(result => {
                                res.redirect(`/showOneQuestion/${result.question_id.id}`);
                            })
                            .catch(err => {
                                const errors = handlerError(err);
                                
                                res.render('editAnswer', {answer, errors, question:answer.question_id, pageTitle: 'Edit answer'})
                                
                            })
                    }
            }
        }
    }
    catch(error) {
        res.render('error', {error: 'Oop... record your want to find does not exist!'});

    }
}

//Remove an answer
const delAnswer = async (req,res) => {

    //looking for the target answer:
    try {    
        const answer = await Answer.findById(mongoose.Types.ObjectId(req.params.id)).populate('question_id').populate('user_id');

        if(!answer){//if answer does not exist
            res.render('error', {error: 'Oop... record your want to find does not exist!'}) 
        }
        else {
            //Checking permission
            const check=await checkPermission(res.locals.user, 'answer', answer,'delete');
            if (!check) {
                
                res.render('error', {error: 'You do not have permission to delete this answer!'});

            }
            else {
                    const question= answer.question_id.id;
                    //after deleted, show the question detail page without the deleted answer
                    
                    Answer.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id))
                        .then( () => {
                            res.redirect(`/showOneQuestion/${question}`);
                        })
                        .catch(err => console.log(err))                    
            }
                
        }
    }
    catch(error) {
        res.render('error', {error: 'Oop... record your want to find does not exist!'});

    }
}

module.exports = {
    addAnswer,
    editAnswer,
    delAnswer,
}


