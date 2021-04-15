const mongoose = require('mongoose');
const Student = require('./student');
const Schema = mongoose.Schema;

const announcementsSchema = new Schema({
    author:{
        type: Schema.Types.ObjectId,
        ref:'Student'
    },
    to: Number,
    announcement:String,
    path:String
});

const Announcements = mongoose.model('Announcements',announcementsSchema);

module.exports = Announcements;