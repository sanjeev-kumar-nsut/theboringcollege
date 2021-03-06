//FOR EXPRESS
const express = require('express');
//FOR ROUTER
const router = express.Router();

//FOR MONGO
const Student = require('../models/student');



router.get('/',async(req,res) => {
    const allstudent = await Student.find();
    var firstyear = [];
    var secondyear = [];
    var thirdyear = [];
    var fourthyear = [];
    for(let student of allstudent)
    {
        if(student.year==1)
        firstyear = [...firstyear,student];
        else if(student.year==2)
        secondyear = [...secondyear,student];
        else if(student.year==3)
        thirdyear = [...thirdyear,student];
        else
        fourthyear = [...fourthyear,student];
    }
    var islogin = JSON.stringify(0);
    if(req.user)
    islogin = JSON.stringify(1);
    res.render('students',{ firstyear,secondyear,thirdyear,fourthyear,islogin });
})
//router.post('/',async(req,res) => {
//    const newstudent = new Student(req.body);
//    await newstudent.save();
//    res.redirect('/students');
//})
router.get('/:id',async(req,res) => {
    const id = req.params.id;
    const findstudent = await Student.findById(id);
    var islogin = JSON.stringify(0);
    if(req.user)
    islogin = JSON.stringify(1);
    res.render('studentprofile',{findstudent,islogin});
})

router.get('/delete/:id',async(req,res) => {
    try{
        const id=req.params.id;
        var islogin = JSON.stringify(0);
    if(req.user)
    islogin = JSON.stringify(1);
        const temp=await Student.findByIdAndDelete(id);
        
    res.redirect('/students');
    }catch(err){
        res.send(err);
    }

})

router.get('/edit/:id',async(req,res) => {
    const id = req.params.id;
    const stud = await Student.findById(id);
    var islogin = JSON.stringify(0);
    if(req.user)
    islogin = JSON.stringify(1);
    res.render('studentedit',{id,stud,islogin});
})

router.post('/:id',async(req,res) => {
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