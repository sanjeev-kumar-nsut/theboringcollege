//FOR EXPRESS
const express = require('express');
//FOR ROUTER
const router = express.Router();

//FOR MULTER
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

//FOR MONGO
const Announcements = require('../models/announcements');

router.get('/',async(req,res) => {
    const announcements = await Announcements.find();
    res.render('announcements',{ announcements});
})
router.post('/',upload.single('file'),async(req,res) => {
    const announcement = new Announcements(req.body);
    announcement.path=`uploads/${req.file.filename}`;
    await announcement.save();
    res.redirect('/announcements');
})
router.get('/add',async(req,res) =>{
   // const id = req.params.id;
   // const announcements = await Announcements.find({_id:id});
    res.render('announcementsadd');
})



//EXPORT
module.exports = router;