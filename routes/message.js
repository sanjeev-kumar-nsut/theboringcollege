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
        var islogin = JSON.stringify(0);
        res.render('loginfailed');
    }
}

router.get('/:id',isLoggedIn,async(req,res) => {
    const id = req.params.id;
    const secondPerson = await Student.findById(id);
    const [firstPerson] = await Student.find({email:currentUserEmail}).populate('message');

    var islogin = JSON.stringify(0);
    if(req.user)
    islogin = JSON.stringify(1);
   res.render('message',{firstPerson,secondPerson,islogin})
})

//EXPORT
module.exports = router;