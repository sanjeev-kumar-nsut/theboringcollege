//FOR DOTENV
require('dotenv').config()

//EXPRESS
const express = require('express')
const app = express()



//FOR SOCKET.IO
var socket = require('socket.io');

//FOR MULTER
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })


//PUBLIC
app.use(express.static('public'))

//FOR PASSPORT
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./passport-setup');
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))


//FOR EJS
const path = require('path');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'))

//FOR MORGAN
const morgan = require('morgan');
app.use(morgan('tiny'));

//FOR BODY PARSER
const bodyParser = require('body-parser')
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
//FOR MONGOOSE
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify:false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MONGODB WORKING");
});

const Student = require('./models/student');
const Notes = require('./models/notes');
const Messages = require('./models/messages')
const Announcements = require('./models/announcements')

//ENCODED
app.use(express.urlencoded({extended:true}))

//FOR PASSPORT-SETUP

let currentUserEmail = null;
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        currentUserEmail = req.user.emails[0].value;
        next();
    } else {
        res.render('loginfailed');
    }
}

//FOR PASSPORT MIDDLE WARE
app.use(passport.initialize());
app.use(passport.session());



//FOR ROUTES
const homeRoutes = require('./routes/home');
const notesRoutes = require('./routes/notes');
const studentsRoutes = require('./routes/students');
const announcementsRoutes = require('./routes/announcements');
const messageRoutes = require('./routes/message');




//REQUEST
//HOME
app.use('/',homeRoutes);

//NOTES
app.use('/notes',notesRoutes);

//STUDENTS
app.use('/students',studentsRoutes);

//ANNOUNCEMENTS
app.use('/announcements',announcementsRoutes);

 //MESSAGE
 app.use('/message',isLoggedIn,messageRoutes);

//LOGIN
app.get('/login',(req,res) => {
    console.log(req.user);
    res.render('login');
})
// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/loginfailed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/loginsuccess');
  }
);
// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/loginsuccess', isLoggedIn, async(req, res) =>{
    currentUserEmail=req.user.emails[0].value;
    const name = req.user.displayName;
    const email = req.user.emails[0].value;
    let [ student ]= await Student.find({email:currentUserEmail});
    
    if(student==undefined)
    {
        student = new Student({name,email});
        await student.save();
        res.render('loginsuccess',{pic:req.user.photos[0].value,student});
    }
    else{
        res.render('loginsuccess',{pic:req.user.photos[0].value,student});
    }
   // res.render("loginsuccess",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})
   // res.render('loginsuccess',{pic:req.user.photos[0].value,student});
})
app.get('/loginfailed',(req,res) => {
    res.render('loginfailed');
})
app.get('/logout', (req, res) => {
    req.session = null;
    currentUserEmail=null;
    req.logout();
    res.redirect('/');
})


//LISTENING
const port=process.env.PORT || 3000;
var server = app.listen(port,function(){
    console.log(`listenening on ${port}`);
});

//SOCKET 
var io = socket(server);

io.on('connection',function(socket){
    console.log('made socket connection');
   
    socket.on('chat', async(data) => {
         //console.log(data);
         const message = new Messages(data);
         const stud = await Student.findById(data.from);
         stud.message.push(message);
         const stud2 = await Student.findById(data.to);
         stud2.message.push(message);
         await stud.save();
         await stud2.save();
         await message.save();
        io.sockets.emit('chat', data);
    });

});




