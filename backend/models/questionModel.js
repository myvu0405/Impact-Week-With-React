const mongoose = require('mongoose');
const User = require('./userModel'); // MYVU updated userModel to User

const Schema = mongoose.Schema;
//MYVU: added validation messages to the model
const questionSchema = new Schema( {
    question :{
        type:String,
        required:[true, 'Please enter you question.'],
        minlength: [5, 'Minimum question length must be 5.']
    },
    description :{
        type:String,
        required:[true,'Please enter your description.'],
        minlength: [5, 'Minimum length of description must be 5.']
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: User, //MYVU updated
    }
}, { timestamps:true})

const Question = mongoose.model('question', questionSchema); //MV updated: questionModel to Question

module.exports = {
    Question
}