//FOR EXPRESS
const express = require('express');
//FOR ROUTER
const router = express.Router();

//FOR MULTER
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

//FOR MONGO
const Notes = require('../models/notes');

router.get('/',async(req,res) => {
    const firstYearNotes = await Notes.find({year:'1'});
    const secondYearNotes = await Notes.find({year:'2'});
    const thirdYearNotes = await Notes.find({year:'3'});
    const fourthYearNotes = await Notes.find({year:'4'});
    var islogin = JSON.stringify(0);
    if(req.user)
    islogin = JSON.stringify(1);
    res.render('notes',{ firstYearNotes,secondYearNotes,thirdYearNotes,fourthYearNotes,islogin });
})
router.post('/add',upload.single('file'),async(req,res) => {
    const addnotes = new Notes(req.body);
    addnotes.path=`uploads/${req.file.filename}`;
    await addnotes.save();
    res.redirect('/notes');
})


//FOR EXPORT
module.exports = router;