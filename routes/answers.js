//FOR EXPRESS
const express = require('express');
const Answers = require('../models/answers');
//FOR ROUTER
const router = express.Router();
//FOR QUESTIONS
const Questions = require('../models/questions');
//FOR STUDENTS
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

router.post('/:id',isLoggedIn,async(req,res)=>{
    const id = req.params.id;
    const ans = new Answers(req.body);
    await ans.save();
    const question = await Questions.findById(id);
    question.answer.push(ans);
    await question.save();
    console.log('added successfully');
    var islogin = JSON.stringify(0);
    if(req.user)
    islogin = JSON.stringify(1);
    res.redirect(`/questions/${id}`);
})

//FOR EXPORT
module.exports = router;
