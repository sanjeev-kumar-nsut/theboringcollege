//FOR EXPRESS
const express = require('express');
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
        res.render('loginfailed');
    }
}

router.get('/',isLoggedIn,async(req,res) => {
    const question = await Questions.find();
    console.log(question);
    res.render('questions',{question});
})
router.post('/',async(req,res)=>{
    const question = new Questions(req.body);
    await question.save();
    res.redirect('/questions');
})

router.get('/add',isLoggedIn,async(req,res) => {
    const [firstPerson] = await Student.find({email:currentUserEmail});
    var d = new Date();
    var a = d.getDate();
    var date =a.toString();
    a = d.getMonth()+1;
    var b = d.getFullYear();
    date = 	date +"/"+ a.toString() +"/"+ b.toString();
    res.render('questionsadd',{firstPerson,date});
})
router.get('/:id',isLoggedIn,async(req,res) => {
    try{
        const id = req.params.id;
        const question = await Questions.findById(id).populate('answer'); 
        const [firstPerson] = await Student.find({email:currentUserEmail});
        var d = new Date();
        var a = d.getDate();
        var date =a.toString();
        a = d.getMonth()+1;
        var b = d.getFullYear();
        date = 	date +"/"+ a.toString() +"/"+ b.toString();
      
        res.render('questionsid',{question,date,firstPerson});
        }catch(err){
            console.log(err);
        }
})

//FOR EXPORT
module.exports = router;
