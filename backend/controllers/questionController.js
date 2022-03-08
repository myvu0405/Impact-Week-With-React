const {Question} = require('../models/questionModel')
const User = require('../models/userModel')
const Answer = require('../models/answerModel'); 
const {handlerError} = require('../config/handlerErrors');

const {checkPermission} = require ('../middleWares/authMiddleWare');

const mongoose = require('mongoose');

//function to get all questions
//route (protected): /all-questions
const getQuestions = async (req,res) => {
    // const questions = await Question.find();
    // if (questions) res.status(200).send(questions)
    // else res.status(500).send('Error happened: Please try again later!')

    //show all questions and number of answers for each question
    let result=[];
    const allQuestions=await Question.find().populate('user_id').sort({createdAt: -1});
    const allAnswers = await Answer.find().populate('question_id');
            
    if (allQuestions && allAnswers) {
        allQuestions.forEach(question => {
            let answerNum=0;
            
            let answersOfQuestion = allAnswers.filter(function(a){
                return a.question_id.id===question.id;
            });
            answerNum=answersOfQuestion.length;
            
            result.push({question, answerNum});

        })
        res.status(200).send(result);
    }
    else res.status(500).send('Error happened: Please try again later!')
}

//add new question:
//route (protected): /addQuestion
const addQuestion = async (req,res) => {
   
        const user=req.user;

        let newQuestion = new Question(req.body);
        newQuestion.user_id = user;
        
        newQuestion.save()
            .then( () => {
                
                res.status(200).send('New question was added successfully.')
            })
            .catch( err => 
            {
                const errors = handlerError(err);
                res.status(400).send(errors)
            })
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
                    res.status(200).send({result,answers});
                })                
                .catch(err => {
                    res.status(500).send(err);
                } )
        }
                
        else {
            res.status(400).send('Oop... record your want to find does not exist!')
        }
    }
    catch(err) {
        res.status(400).send('Oop... record your want to find does not exist!')

    }      
            
}

//Delete one question

const delQuestion = async (req, res) => {

    //Checking if the question exists in the db...
    try {
        const question= await Question.findById(mongoose.Types.ObjectId(req.params.id)).populate('user_id');
        if (question) { //If question exists

            const check= await checkPermission(req.user, 'question', question);
            if (!check) {//If user does not have right to delete
                
                res.status(401).send('You do not have permission to delete this question!');
            }
            else {
                Question.findByIdAndDelete(req.params.id)
                    .then( () => {
                        
                        //find all answers belong to the question and delete them
                        Answer.deleteMany({question_id: mongoose.Types.ObjectId(req.params.id)})
                            .then(() => {
                                res.status(200).send('Deleted question successfully.')
                            })
                            .catch(err => {
                                res.status(500).send(err);

                            })
                        
                    })
                    .catch( err => {
                        res.status(500).send(err);
                    
                    }) 
            }
        }
        else {
            res.status(400).send('Oop... record your want to find does not exist!');
        }
    }
    catch(error) {
        res.status(400).send('Oop... record your want to find does not exist!');

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
    getQuestions,
    addQuestion,
    showOneQuestion,
    delQuestion,
    editQuestion}