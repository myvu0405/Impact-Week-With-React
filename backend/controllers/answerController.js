const mongoose = require('mongoose');
const {Question} = require('../models/questionModel');
const Answer = require('../models/answerModel');
const User = require('../models/userModel');

const {handlerError} = require('../config/handlerErrors');

const {checkPermission}= require('../middleWares/authMiddleWare');

//Add an answer to a question:

const addAnswer = async (req,res) => {
    //getting data from request
    const {description, question_id} = req.body;
    //get the question
    const question = await Question.findById(question_id);
    //get the user
    const user=req.user;
    //create new answer
    const newAnswer=new Answer({description, user_id: user, question_id: question});
    newAnswer.save()
        .then(() => {
            res.status(200).send({newAnswer, result: 'New answer was added.'})
        })
        .catch(err => {
            const errors =handlerError(err);
            res.status(400).send(errors);
        }) 
}

const getOneAnswer = async (req,res) =>
{
    try {    
        
        const answer = await Answer.findById(mongoose.Types.ObjectId(req.params.id)).populate('question_id').populate('user_id');
        if (!answer) {//IF answer not found
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
        res.status(400).send('Oop... record your want to find does not exist!');
    }
}

//Edit an answer:
const editAnswer = async (req,res) => {

    //Looking for the target answer:
    try {    
        
        const answer = await Answer.findById(mongoose.Types.ObjectId(req.params.id)).populate('question_id').populate('user_id');

        if (!answer) {//IF answer not found
            res.status(400).send('Oop... record your want to find does not exist!');
        }
        else {            

            //check user permission
            const check=await checkPermission(req.user, 'answer', answer);
            if (!check) {
                res.status(401).send('You do not have right to edit this answer!');

            }
            else {
            
                    answer.description=req.body.description;
                    answer.save()
                        .then(updatedAnswer => {
                            res.status(200).send({answer:updatedAnswer, result: 'Updated answer successfully.'})
                        })
                        .catch(err => {
                            const errors = handlerError(err);
                            
                            res.status(400).send(errors);
                            
                        })
                }
        }
    }
    catch(error) {
        res.status(400).send('Oop... record your want to find does not exist!');

    }
}

//Remove an answer
const delAnswer = async (req,res) => {

    //looking for the target answer:
    try {    
        const answer = await Answer.findById(mongoose.Types.ObjectId(req.params.id)).populate('question_id').populate('user_id');

        if(!answer){//if answer does not exist
            res.status(400).send('Oop... record your want to find does not exist!');
        }
        else {
            //Checking permission
            const check=await checkPermission(req.user, 'answer', answer,'delete');
            if (!check) {
                
                res.status(401).send('You do not have permission to delete this answer!');

            }
            else {
                    //after deleted, show the question detail page without the deleted answer
                    
                    Answer.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id))
                        .then( () => {
                            res.status(200).send('One answer has been deleted.')
                        })
                        .catch(err => {
                            res.status(500).send('Error occurs: Please try again later.')
                        })                    
            }
                
        }
    }
    catch(error) {
        res.status(400).send('Oop... record your want to find does not exist!');


    }
}

module.exports = {
    addAnswer,
    editAnswer,
    delAnswer,
    getOneAnswer
}


