//FOR EXPRESS
const express = require('express');
//FOR ROUTER
const router = express.Router();

router.get('/',(req,res) => {
    res.render('home');
})


//EXPORT
module.exports = router;