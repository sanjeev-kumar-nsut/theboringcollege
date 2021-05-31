//FOR EXPRESS
const express = require('express');
//FOR ROUTER
const router = express.Router();



router.get('/',(req,res) => {
   
    var islogin = JSON.stringify(0);
    if(req.user)
    islogin = JSON.stringify(1);
    res.render('home',{islogin});
})

//EXPORT
module.exports = router;