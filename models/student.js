const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name:String,
    year:Number,
    branch:String,
    section:Number,
    email:String,
    description:String
});

const Student = mongoose.model('student',studentSchema);

module.exports = Student;