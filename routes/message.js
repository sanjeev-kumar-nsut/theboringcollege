//FOR EXPRESS
const express = require('express');
//FOR ROUTER
const router = express.Router();

//FOR MONGO
const Messages = require('../models/messages')
const Student = require('../models/student');

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        currentUserEmail = req.user.emails[0].value;
        next();
    } else {
        res.render('loginfailed');
    }
}

router.get('/:id',isLoggedIn,async(req,res) => {
    const id = req.params.id;
    const secondPerson = await Student.findById(id);
    const firstPerson = await Student.find({email:currentUserEmail});
    const firstMessage = await Messages.find({from:firstPerson[0]._id,to:secondPerson._id});
    const secondMessage = await Messages.find({from:id,to:firstPerson[0]._id});
    
    res.render('message',{firstPerson,secondPerson,firstMessage,secondMessage});
})

//EXPORT
module.exports = router;