const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Messages = require('./messages');
const studentSchema = new Schema({
    name:String,
    year:Number,
    branch:String,
    section:Number,
    email:String,
    description:String,
    message:[
        {
            type:Schema.Types.ObjectId,
            ref:'Messages'
        }
    ],
    contact:[
        {
            sId:{
                type:String,            
            },
            sName:{
                type:String,
                }
        }
    ]
});

const Student = mongoose.model('student',studentSchema);

module.exports = Student;