const mongoose = require('mongoose');
const {Question} = require('../models/questionModel');
const Answer = require('../models/answerModel');
const User = require('../models/userModel');

const {handlerError} = require('../config/handlerErrors');

const {checkPermission}= require('../middleWares/authMiddleWare');//My VU updated

//Add an answer to a question:

const addAnswer = async (req,res) => {
    //getting data from request
    // const {answer, question_id, user_id} = req.body;
    const {description, question_id} = req.body;

    const question = await Question.findById(question_id);
    // const user=await User.findById(user_id);
    const user=req.user;
    //create new answer
    const newAnswer=new Answer({description, user_id: user, question_id: question});
    newAnswer.save()
        .then(() => {
            // res.redirect(`/showOneQuestion/${question_id}`);
            res.status(200).send({newAnswer, result: 'New answer was added.'})
        })
        .catch(err => {
            const errors =handlerError(err);
            // Answer.find({question_id:question}).populate('question_id').populate('user_id').sort({updatedAt: -1})
            //     .then(answers => {
            //         res.render('showOneQuestion', {result:question,answers,errors,pageTitle:'Question detail'})
            //     })
            //     .catch(err => console.log(err))

            res.status(400).send(errors);
        }) 
}

const getOneAnswer = async (req,res) =>
{
    try {    
        
        const answer = await Answer.findById(mongoose.Types.ObjectId(req.params.id)).populate('question_id').populate('user_id');
        if (!answer) {//IF answer not found
            // res.render('error', {error: 'Oop... record your want to find does not exist!'});
            res.status(400).send('Oop... record your want to find does not exist!');
        }
        else {

            //Checking user permission:
            const check=await checkPermission(req.user, 'answer', answer);
            if (!check) {
                
                res.status(401).send('You do not have right to edit this answer!');
            }
            else {
                    res.status(200).send(answer);
            }                    
            
        }
    }
    catch(error) {
        // res.render('error', {error: 'Oop... record your want to find does not exist!'});
        res.status(400).send('Oop... record your want to find does not exist!');
    }
}

//Edit an answer:
const editAnswer = async (req,res) => {

    //Looking for the target answer:
    try {    
        
        const answer = await Answer.findById(mongoose.Types.ObjectId(req.params.id)).populate('question_id').populate('user_id');

        if (!answer) {//IF answer not found
            // res.render('error', {error: 'Oop... record your want to find does not exist!'});
            res.status(400).send('Oop... record your want to find does not exist!');
        }
        else {            

            //check user permission
            const check=await checkPermission(req.user, 'answer', answer);
            if (!check) {
                
                // res.render('error',{error:'You do not have right to edit this answer!'});
                res.status(401).send('You do not have right to edit this answer!');

            }
            else {
            
                    answer.description=req.body.description;
                    answer.save()
                        .then(updatedAnswer => {
                            // res.redirect(`/showOneQuestion/${result.question_id.id}`);
                            res.status(200).send({answer:updatedAnswer, result: 'Updated answer successfully.'})
                        })
                        .catch(err => {
                            const errors = handlerError(err);
                            
                            // res.render('editAnswer', {answer, errors, question:answer.question_id, pageTitle: 'Edit answer'})
                            res.status(400).send(errors);
                            
                        })
                }
        }
    }
    catch(error) {
        // res.render('error', {error: 'Oop... record your want to find does not exist!'});
        res.status(400).send('Oop... record your want to find does not exist!');

    }
}

//Remove an answer
const delAnswer = async (req,res) => {

    //looking for the target answer:
    try {    
        const answer = await Answer.findById(mongoose.Types.ObjectId(req.params.id)).populate('question_id').populate('user_id');

        if(!answer){//if answer does not exist
            // res.render('error', {error: 'Oop... record your want to find does not exist!'}) 
            res.status(400).send('Oop... record your want to find does not exist!');
        }
        else {
            //Checking permission
            const check=await checkPermission(req.user, 'answer', answer,'delete');
            if (!check) {
                
                // res.render('error', {error: 'You do not have permission to delete this answer!'});
                res.status(401).send('You do not have permission to delete this answer!');

            }
            else {
                    // const question= answer.question_id.id;
                    //after deleted, show the question detail page without the deleted answer
                    
                    Answer.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id))
                        .then( () => {
                            // res.redirect(`/showOneQuestion/${question}`);
                            res.status(200).send('One answer has been deleted.')
                        })
                        .catch(err => {
                            // console.log(err);
                            res.status(500).send('Error occurs: Please try again later.')
                        })                    
            }
                
        }
    }
    catch(error) {
        // res.render('error', {error: 'Oop... record your want to find does not exist!'});
        res.status(400).send('Oop... record your want to find does not exist!');


    }
}

module.exports = {
    addAnswer,
    editAnswer,
    delAnswer,
    getOneAnswer
}


