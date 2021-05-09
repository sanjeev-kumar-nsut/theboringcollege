const mongoose = require('mongoose');
const Student = require('./student');
const Answers = require('./answers');
const Schema = mongoose.Schema;

const questionsSchema = new Schema({
    author:{
        type: Schema.Types.ObjectId,
        ref:'Student'
    },
    branch:String,
    question:String,
    answer:[
        {
        type: Schema.Types.ObjectId,
        ref:'Answers'
        }
    ],
    date:String
});

const Questions = mongoose.model('Questions',questionsSchema);

module.exports = Questions;