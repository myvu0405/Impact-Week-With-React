const {Question} = require('../models/questionModel')
const User = require('../models/userModel')
const Answer = require('../models/answerModel'); 
const {handlerError} = require('../config/handlerErrors');

const {checkPermission} = require ('../middleWares/authMiddleWare');

const mongoose = require('mongoose');

//MV added: 
//function to get all questions
//route (protected): /all-questions
const getQuestions = async (req,res) => {
    const questions = await Question.find().populate('user_id').sort({createdAt: -1});
    if (questions) res.status(200).send(questions)
    else res.status(500).send('Error happened: Please try again later!')
}

//add new question:
//route (protected): /addQuestion
const addQuestion = async (req,res) => {
    /*
    if (req.method === 'GET') {
        let newQuestion={question:'',description:''};
        res.render('addQuestion', {newQuestion,errors: null, pageTitle: 'Add question'}); 
    }
    if (req.method === 'POST') {*/
            //const id = res.locals.user.id;
            // const user = await User.findById(id);
            //MY updated:
            const user=req.user;

            let newQuestion = new Question(req.body);
            newQuestion.user_id = user;
            
            newQuestion.save()
                .then( () => {
                    
                    // res.redirect('/questions');
                    res.status(200).send('New question was added successfully.')
                })
                .catch( err => 
                {
                    const errors = handlerError(err);
                    
                    // res.render('addQuestion', {newQuestion:req.body,errors, pageTitle: 'Add question'}); 
                    res.status(400).send(errors)
                })
    /*} */
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
                        // res.render('showOneQuestion', {result, answers,errors:null,pageTitle: 'Question detail'});
                        // console.log(result);
                        const username = result.user_id.username;
                        const id = result.user_id.id;

                        // res.status(200).send(result.user_id.username)
                        res.status(200).send({result,answers, username, id});
                    })                
                    .catch(err => {
                        // res.render('error',{error:'Oop... record your want to find does not exist!'})
                        res.status(500).send(err);
                    } )
        }
                
        else {
            // res.render('error',{error:'Oop... record your want to find does not exist!'}) 
            res.status(400).send('Oop... record your want to find does not exist!')
        }
    }
    catch(err) {
        // res.render('error',{error:'Oop... record your want to find does not exist!'});
        res.status(400).send('Oop... record your want to find does not exist!')

    }      
            
}

// Delete one question

const delQuestion = async (req, res) => {
    // console.log(req.user);
    
    //Checking if the question exists in the db...
    try {
        const question= await Question.findById(mongoose.Types.ObjectId(req.params.id)).populate('user_id');
        if (question) { //If question exists
            const check= await checkPermission(req.user, 'question', question);
            if (!check) {//If user does not have right to delete
                res.send('You do not have permission to delete this question!')
                // res.render('error',{error:'You do not have permission to delete this question!'});
            }
            else {
                //=============================================
                    Question.findByIdAndDelete(req.params.id)
                        .then( () => {
                            
                            //find all answers belong to the question and delete them
                            Answer.deleteMany({question_id: mongoose.Types.ObjectId(req.params.id)})
                                .then((result) => {
                                    res.status(200).send('Question was deleted')
                                    // res.redirect('/questions');
                                })
                                .catch(err => {
                                    res.status(400).send(err);
                                    // console.log(err)
                                })
                            
                        })
                        .catch( err => {
                            res.status(500).send(err);
                            console.log(err)
                        }) 
                }
        }
        else { 
            res.send('Oop... record your want to find does not exist!');
            // res.render('error',{error : 'Oop... record your want to find does not exist!'});
        }
    }
    catch(error) {
        res.status(505).send('Oop... record your want to find does not exist!')
        // res.render('error',{error : 'Oop... record your want to find does not exist!'});
    }
}

//Edit one question function:

const editGetQuestion = async (req, res) => {
    const result = await Question.findById(mongoose.Types.ObjectId(req.params.id)).populate('user_id');
    if (!result) {//IF answer not found
        // res.render('error', {error: 'Oop... record your want to find does not exist!'});
        res.status(400).send('Oop... record your want to find does not exist!');
    } else {
        res.send(result);
        // const check=await checkPermission(res.user, 'question', result);
        // if (!check) {
        //     res.send('You do not have permission to edit this question!')
        //     // res.render('error', {error: 'You do not have permission to edit this question!'});
        // }
        // else {
        //     res.send(result);
        // // res.render('editQuestion', { result, errors: false, pageTitle: 'Edit question'})
        // } 
    }
}

const editQuestion = async (req, res) => {
    const result = await Question.findById(mongoose.Types.ObjectId(req.params.id)).populate('user_id');
    result.question = req.body.question;
    result.description = req.body.description;
    result.save() 
    .then((result) => {
        res.send('question updated');
        // res.redirect(`/showOneQuestion/${req.params.id}`); 
    }) 
    .catch(err => {
        const errors = handlerError(err);
        res.send(errors);
        // res.render('editQuestion', {errors, result, pageTitle: 'Edit question'});
    })
}

// const editQuestion = async (req, res) => {

//     // Looking for the question in db    
//     try {
//         const result = await Question.findById(mongoose.Types.ObjectId(req.params.id)).populate('user_id');
//         console.log(result);
//         if(result) { //check if the question exists

//             if(req.method === 'GET'){
//                 //Checking user's permission
//                 const check=await checkPermission(res.user, 'question', result);
                
//                 if (!check) {
//                     res.send('You do not have permission to edit this question!')
//                     // res.render('error', {error: 'You do not have permission to edit this question!'});
//                 }

//                 else {
//                         res.send(result);
//                     // res.render('editQuestion', { result, errors: false, pageTitle: 'Edit question'})
                        
//                 } 
//             }
//             if (req.method ==='POST'){

//                 //Checking user's permission

//                 const check=await checkPermission(res.user, 'question', result);
//                 if (!check) {
//                     res.send('You do not have permission to edit this question!')
//                     // res.render('error', {error: 'You do not have permission to edit this question!'});
//                 }
//                 else {
                
//                         result.question = req.body.question;
//                         result.description = req.body.description;
//                         result.save() 
//                         .then((result) => {
//                             res.send(result);
//                             // res.redirect(`/showOneQuestion/${req.params.id}`); 
//                         }) 
//                         .catch(err => {
//                             const errors = handlerError(err);
//                             res.send(errors);
//                             // res.render('editQuestion', {errors, result, pageTitle: 'Edit question'});
//                         })
//                 }
                    
//             }
    
//         }
//         //if cannot find the question in db
//         else {
//             res.send('Oop... record your want to find does not exist 111!');
//             // res.render('error', {error: 'Oop... record your want to find does not exist!'}) 
//         }
        
        
//     }
//     catch(error ){
//         res.send('Oop... record your want to find does not exist 222!');
//         // res.render('error', {error: 'Oop... record your want to find does not exist!'})
//     }

// }

module.exports = {
    getQuestions,
    addQuestion,
    showOneQuestion,
    delQuestion,
    editQuestion,
    editGetQuestion,
}