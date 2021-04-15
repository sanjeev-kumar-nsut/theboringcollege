//FOR EXPRESS
const express = require('express');
//FOR ROUTER
const router = express.Router();

//FOR MONGO
const Student = require('../models/student');


router.get('/',async(req,res) => {
    const allstudent = await Student.find();
    res.render('students',{ allstudent });
})
router.post('/',async(req,res) => {
    const newstudent = new Student(req.body);
    await newstudent.save();
    res.redirect('/students');
})
router.get('/:id',async(req,res) => {
    const id = req.params.id;
    const findstudent = await Student.findById(id);
    res.render('studentprofile',{findstudent});
})
router.get('/add',(req,res) => {
    res.render('addstudent');
})
router.get('/deleteall',async(req,res) => {
    await Student.deleteMany();
    const allstudent = await Student.find();
    res.render('students',{ allstudent });
})

router.get('/edit/:id',async(req,res) => {
    const id = req.params.id;
    res.render('studentedit',{id});
})

router.post('/students/:id',async(req,res) => {
    try{
    const id = req.params.id;
    const update = req.body;
    console.log(req.body);
    const student = await Student.findByIdAndUpdate(id,update,{new:true});
    await student.save();
    console.log(student);
    res.redirect(`/students/${id}`); 
    }catch(err){
        console.log(err);
    }
})



//FOR EXPORT
module.exports = router;