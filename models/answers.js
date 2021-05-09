const mongoose = require('mongoose');
const Student = require('./student');
const Schema = mongoose.Schema;

const answersSchema = new Schema({
    author:{
        type: Schema.Types.ObjectId,
        ref:'Student'
    },
    answer:String,
    date:String
});

const Answers = mongoose.model('Answers',answersSchema);

module.exports = Answers;