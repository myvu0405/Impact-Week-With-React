//Created by My Vu

const mongoose = require('mongoose');
const User = require('./userModel');
const {Question} = require('./questionModel');


const Schema = mongoose.Schema;

const answerSchema = new Schema( {
    description :{
        type:String,
        required:[true,'Please enter your answer.'],
        minlength: [5,'Minimum answer length must be 5.'],
        maxlength: [300,'Maximum answer length must be 300']
    },
    
    user_id: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    question_id: {
        type: Schema.Types.ObjectId,
        ref: Question
    }
}, { timestamps:true})

const Answer = mongoose.model('answer', answerSchema); 

module.exports = Answer;