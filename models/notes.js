const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notesSchema = new Schema({
    name:String,
    branch:String,
    year:Number,
    path:String
});

const notes = mongoose.model('notes',notesSchema);

module.exports = notes;