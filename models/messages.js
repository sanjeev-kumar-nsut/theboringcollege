const mongoose = require('mongoose');
const Student = require('./student');
const Schema = mongoose.Schema;

const messagesSchema = new Schema({
    from:{
        type: Schema.Types.ObjectId,
        ref:'Student'
    },
    to:{
        type: Schema.Types.ObjectId,
        ref:'Student'
    },
    message:String
});

const Messages = mongoose.model('Messages',messagesSchema);

module.exports = Messages;